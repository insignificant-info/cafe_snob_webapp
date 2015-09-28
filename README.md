# cafe_snob_webapp
A web front end for cafesnob.info using Flask, MySQL, and Twitter Bootstrap. Set up to run on an apache server in an AWS ubuntu instance.


Note that you also need a to create cafesnob.conf located in: /etc/apache2/sites-available/

and containing:

\<VirtualHost *:80\>

		ServerName www.cafesnob.info
		ServerAdmin admin@cafesnob.info
		WSGIScriptAlias / /var/www/Flaskapp/cafesnob.wsgi
		<Directory /var/www/Flaskapp/app/>
			Order allow,deny
			Allow from all
		</Directory>
		Alias /static /var/www/Flaskapp/app/static
		<Directory /var/www/Flaskapp/app/static/>
			Order allow,deny
			Allow from all
		</Directory>
		ErrorLog ${APACHE_LOG_DIR}/error.log
		LogLevel warn
		CustomLog ${APACHE_LOG_DIR}/access.log combined
\</VirtualHost>


Make sure to start and end the file with those virtual host bits that aren't sitting in the code block properly
