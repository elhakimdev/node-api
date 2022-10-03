#!/bin/bash
exec /usr/sbin/mysqld_safe
echo "Starting the mysql daemon server"
service mysql start
if [ -n "$MYSQL_PASSWORD" ] ; then

	TEMP_FILE='/tmp/mysql-first-time.sql'
	cat > "$TEMP_FILE" <<-EOSQL
		DELETE FROM mysql.user WHERE user = 'root' AND host = '%';
		CREATE USER 'root'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}' ;
		GRANT ALL ON *.* TO 'root'@'%' WITH GRANT OPTION ;
		FLUSH PRIVILEGES ;
	EOSQL

	# set this as an init-file to execute on startup
	set -- "$@" --init-file="$TEMP_FILE"
fi

# execute the command supplied
exec "$@"

npm install
npm install 
npx prisma generate
npx prisma db push
npm run build --prod
node dist/index.js