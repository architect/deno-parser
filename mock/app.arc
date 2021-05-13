@app
testapp

@aws
apigateway http
bucket mahbukkitt
concurrency 100
layer foo
layers
  bar
  baz
policy fiz
policies
  buz
memory 256
profile work
region us-west-1
runtime nodejs10.x
timeout 10

@static
fingerprint true
folder dist
ignore yep
spa true
prefix something
prune true
staging a-bucket
production another-bucket

@http
get      /
get      /path/*
post     /post
put      /put
patch    /patch
delete   /delete
head     /head
options  /options
any      /any

@proxy
local http://localhost:4444
staging https://some.staging.site
production https://some.production.site

@ws

@events
an-event
another-event

@scheduled
daily-foo rate(1 day)

@queues
a-queue
another-queue
so-many-queues

@tables
data
  ID *String
  key **String

moreData
  ID *String
  key **String

@indexes
data
  anotherID *Number
  anotherKey **String

moreData
  anotherID *Number
