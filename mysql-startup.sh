#!/bin/bash
echo "Starting the mysql daemon server"
systemctl enable mysql.service
systemctl status mysql.service
systemctl start mysql.service
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
systemctl restart mysql.service

npm install
npm install 
npx prisma generate
npx prisma db push
npm run build --prod
node dist/index.js