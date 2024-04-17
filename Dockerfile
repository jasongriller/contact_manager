FROM httpd:2.4

# Copy HTML files
COPY ./html/ /usr/local/apache2/htdocs/

# Copy CSS files
COPY ./css/ /usr/local/apache2/htdocs/css/

# Copy JavaScript files
COPY ./js/ /usr/local/apache2/htdocs/js/

# Copy images
COPY ./images/ /usr/local/apache2/htdocs/images/
