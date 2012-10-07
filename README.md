To run the app:

    $ git clone git@github.com:jlecomte/mojito-perftest-app2.git
    $ cd mojito-perftest-app2
    $ npm install
    $ ./create.sh
    $ ./node_modules/mojito-shaker/bin/mojito-shake
    $ ./node_modules/mojito/bin/mojito start

Note: You may run `create.sh` multiple times...

At that point, the app is available at `http://localhost:8666/`

You can then run `httperf`:

    $ httperf --server=localhost --port=8666 --uri=/ --num-conns=1 --num-calls=1000

The app automatically computes the average time to serve a request and logs it
to the standard output for every 100 requests. This time is measured at the
server, which reduces the impact of the network.

A graph may be generated from those times to prove that the app remains stable
over time.
