//
//
let CF = {
    app: {
        name: "fullstack jwt - backend_node",
        version: "0.0.1"
    },
    server: {
        port: 5153,
        apiPath: '/api'
    },
    // mongodb setting
    mongoose: {
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        // url : 'mongodb+srv://wamoo:wamoo@devconnector.jdg80.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        url : 'mongodb://127.0.0.1:27017/fs_jwt_node'
    },
    // JWT (JSONWebToken)
    password: {
        saltLength: 10
    },
    jwt: {
        algorithm: 'HS256',
        secret_str : "this-auth-token",
        token_exp:  3 * 24 * 60 * 60 // 24 * 60 minutes
    },
    frontEnd: {
        path_react: '../client_react/build',
        path_vue: '../client_vue/dist'
    }
}


module.exports = CF
