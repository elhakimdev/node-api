#!/bin/bash
/usr/bin/mysqld_safe &
sleep 10s
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

/home/node/app npm install
/home/node/app npm install 
/home/node/app npx prisma generate
/home/node/app npx prisma db push
/home/node/app npm run build --prod
/home/node/app node dist/index.js