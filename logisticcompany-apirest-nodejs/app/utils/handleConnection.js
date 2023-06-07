const { dbConnect_MongoDB } = require('../../config/mongo');
//const { dbConnect_MySQL }   = require('../../config/mysql/mysql');

const { sequelize_pg }      = require('../../config/postgresql/sequalize-pg');

async function connecting(TYPE_DB, DB, TYPE_FORMAT) {
    switch(TYPE_DB) {
        case 'relacional':
    
            switch(DB) {
                case 'mysql':
                    break;
    
                case 'postgresql':
                    switch(TYPE_FORMAT) {
                        case 'notorm':
                            break;
                        
                        case 'orm':
                            const connecting = async () => {
                                try {
                                    await sequelize_pg.authenticate();
                                    await sequelize_pg.sync({ alter: true });
                                    console.log('Connection has been established successfully.');
                                  } catch (error) {
                                    console.error('Unable to connect to the database:', error);
                                  }
                            }
                            connecting();
                            break;
    
                        default:
                            break;
                    }
                    break;
    
                default:
                    break;
            }
    
            break;
    
            case 'norelacional':
    
                switch(DB) {
                    case 'mongodb':
                        dbConnect_MongoDB();
                        break;
        
                    case 'dynamodb':
                        break;
        
                    default:
                        break;
                }
        
                break;
    }
}

module.exports = { connecting };