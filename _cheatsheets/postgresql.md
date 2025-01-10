---
published: true
title: "Postgresql"
thumbnail: "/assets/img/cheatsheet_icons/postgresql.png"
---

### Postgres login
```shell 
psql -U <username>              //Log-in as user
```

### Lists
_Note: All variables like <TABLE_NAME> should be enclosed in double brackets (") when uppercase_
```shell 
\l+                             //List databases
\dn+                            //List schemas
\dt+                            //List tables
\dp+                            //List tables and access privileges
\d <TABLE_NAME>                 //List columns in table
```

### Selecting from table
This uses Standard Query Language (SQL). Just don't be stupid like me and forget the trailing `;`