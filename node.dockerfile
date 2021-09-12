# pull official base image
FROM node:14-alpine

#RUN  mkdir -p app

# set working directory
WORKDIR /app

# install app dependencies
COPY ./backend/package.json ./
# COPY /backend/package-lock.json ./app
# RUN npm install --silent

# add app
COPY ./backend ./

#COPY bootstrap.sh .
#RUN chmod +x bootstrap.sh 
#RUN ./bootstrap.sh 


EXPOSE 4000

# start app
CMD ["npm", "start"]