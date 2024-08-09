// Função para retornar uma resposta HTTP 200 (OK)
const ok = async (data) => {
    return {
        statusCode: 200,
        body: data
    };
};

// Função para retornar uma resposta HTTP 201 (Created)
const created = async () => {
    return {
        statusCode: 201,
        body: {
            message: "Created"
        }
    };
};

// Função para retornar uma resposta HTTP 204 (No Content)
const noContent = async () => {
    return {
        statusCode: 204,
        body: null
    };
};

// Função para retornar uma resposta HTTP 400 (Bad Request)
const badRequest = async () => {
    return {
        statusCode: 400,
        body: null
    };
};

module.exports = {
    ok,
    created,
    noContent,
    badRequest
};
