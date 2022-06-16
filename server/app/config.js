const config = {
    app: {
        port: process.env.PORT || 8080
    },
    db_config: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'qlkho_db',
        connectionLimit: 30,
        multipleStatements: true
    }
};
module.exports = config;