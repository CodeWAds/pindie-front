export const isResponseOk = (response) => {
    return !(response instanceof Error);
};

export const getData = async (url) => {
    try {
        const response = await fetch(url)

        if (response.status !== 200) {
            throw new Error
        }
        const data = await response.json()
        return data
    } catch (error) {
        return error;
    };
}

const normalizeDataObject = (obj) => {
    let str = JSON.stringify(obj)

    str = str.replaceAll('_id', 'id');
    const newObj = JSON.parse(str);
    const result = { ...newObj, category: newObj.categories }
    return result;
}

export const normalizeData = (data) => {
    return data.map((item) => {
        return normalizeDataObject(item)
    })
};

const findVotedData = (data, currentUser) => {
    data = normalizeData(data);
    return data.filter((item) => {
        return item.users.find(user => user.id === currentUser);
    });
};


export const getNormalizedGamesDataByCategory = async (url, category) => {
    const data = await getData(`${url}?categories.name=${category}`);

    return isResponseOk(data) ? normalizeData(data) : data;
};

export const getNormalizedGameDataById = async (url, id) => {
    const data = await getData(`${url}/${id}`);
    return isResponseOk(data) ? normalizeDataObject(data) : data;
};

export const getVotedGames = async (url, currentUser) => {

    const data = await getData(url);

    return isResponseOk(data) ? findVotedData(data, currentUser) : data;

};

export const authentication = async (url, data, typeForm) => {
    try {
        const response = await fetch(url, {
            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify(data),
        });
        
        if (response.status !== 200 && typeForm === "auth") {
            throw new Error("Ошибка авторизации");
        } else if (response.status !== 200 && typeForm === "register") { throw new Error("Ошибка регистрации"); }
        const result = await response.json();
        return result;

    } catch (error) {
        return error;
    };
};

export const setJWT = (jwt) => {
    localStorage.setItem("jwt", jwt);
};

export const getJWT = () => {
    return localStorage.getItem("jwt");
};

export const removeJWT = () => {
    localStorage.removeItem("jwt");
};

export const getMe = async (url, jwt) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${jwt}` },
        });
        if (response.status !== 200) {
            throw new Error("Ошибка получения данных");
        };
        const result = await response.json();

        return result;
    } catch (error) {
        return error;
    }
};

export const checkIfUserVoted = (game, userId) => {
    return game.users.find((user) => user.id === userId);
};

export const vote = async (url, jwt, usersArray) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ users: usersArray }),
        });
        if (response.status !== 200) {
            throw new Error('Ошибка голосования')
        }
        const result = await response.json();
        return result
    } catch (error) {
        return error
    }
};