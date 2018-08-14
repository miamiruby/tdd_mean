use armour
db.addUser('armour', 'password')

use admin


db.createUser({user: "admin", pwd: "password", roles:["root"]})

db.addUser({user: "admin", pwd: "password", roles: [ "userAdminAnyDatabase", "readWriteAnyDatabase", "dbAdminAnyDatabase", "clusterAdmin" ]}));
