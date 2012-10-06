/*jslint anon:true, sloppy:true, nomen:true, plusplus: true*/

YUI.add('MasterMojit', function (Y, NAME) {

    var cfg = { children: {} },
        microtime,
        now,
        i;

    try {
        microtime = require('microtime');
        now = microtime.now;
    } catch (e) {
        now = Date.now;
    }

    for (i = 1; i <= 50; i++) {
        cfg.children['slot-' + i] = {
            id: 'slot-' + i,
            type: 'Mojit' + i,
            action: 'index',
            config: {
                whatever: i
            }
        };
    }

    Y.namespace('mojito.controllers')[NAME] = {

        index: function (ac) {

            var duration = 0,
                start;

            Y.each(Y.mojito.controllers, function (c) {
                var f = c.index;
                if (f) {
                    c.index = function (ac) {
                        var start = now();
                        f.call(c, ac);
                        duration += (now() - start);
                    };
                }
            });

            start = now();

            ac.composite.execute(cfg, function (data, meta) {
                ac.done(data, meta);

                var total = now() - start;

                Y.log('============================================================================', 'warn');
                Y.log('Overall time: ' + (microtime ? total / 1000 : total) + ' msec', 'warn');
                if (duration > 0) {
                    Y.log('Time spent in our code: ' + (microtime ? duration / 1000 : duration) + ' msec [' + Math.round((100 * duration) / total) + '%]');
                } else {
                    Y.log('Execute the app a second time to see how much time was spent in the app code', 'warn');
                }
                Y.log('============================================================================', 'warn');
            });
        }
    };

}, '0.0.1', {
    requires: ['mojito-composite-addon']
});
