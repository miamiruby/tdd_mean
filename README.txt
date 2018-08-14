

# I started with getting rest to work using express, mongodb, mocha, chai..
Then I was going to change out the archive style to a different collection..
After that I was going to add Kafka or Kue...
I was tring to get the mongodb working on mongolabs but the local mongodb drive was newer then then the version 3 labs was running
and that fored me to setup mongo and work on getting auth working properly....

this was fun playing with mocha and chai



#to setup mongodb

brew install mongodb
brew services start mongodb
mongodb

mongo admin -u admin -p password < setupMongo.js
