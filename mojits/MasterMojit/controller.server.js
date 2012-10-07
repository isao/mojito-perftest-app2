/*jslint anon:true, sloppy:true, nomen:true, plusplus: true*/

YUI.add('MasterMojit', function (Y, NAME) {

    var cfg = { children: {} },
        now = require('microtime').now,
        i;

    for (i = 1; i <= 50; i++) {
        cfg.children['slot-' + i] = {
            id: 'slot-' + i,
            type: 'Mojit' + i,
            action: 'index',
            config: {
                whatever: i
            },
            params: {
                route: {},
                url: {},
                body: {
                    data: {
                        "class": "Result",
                        "type": "ysm-ads",
                        "id": "a2316f38-0e90-4349-b067-286219a1c61c",
                        "meta": {
                            "region": "Sidebar",
                            "dla": "50",
                            "dlb": "50",
                            "adg": "",
                            "mscpcsb": "HdPJ.2HLfw--",
                            "relscore": "0.425887",
                            "impid": "1503118507",
                            "rnkscore": "41221",
                            "mscpc": "HdPJ.2HLfw--",
                            "mscpcml": "HdPJ.2HLfw--",
                            "spq": "obama",
                            "pos": "1",
                            "cpg": "0.15",
                            "ctv": "",
                            "rebate": "false",
                            "rnk": "3",
                            "bid": "EG7.DLnKZK0a",
                            "bidpos": "3",
                            "lstid": "12003028304",
                            "trm": "",
                            "cnq": "obama",
                            "adult": "G",
                            "omm": "Broad",
                            "cost": "HdPJ.2HLfw--",
                            "cid": "",
                            "ecpi": "1",
                            "SSRB": "ZQAqAA8ADwAPAAAQ9AABhqAAAKZdAD7l9AAAABgAAASwBLAEsAAST4AAEk+A",
                            "clkb": "Ir5BlUfOea0-"
                        },
                        "data": {
                            "abstract": "Would you re-elect <strong>Obama</strong>? Share Your Opinion Here.",
                            "title": "Romney vs. <strong>Obama</strong>",
                            "officialSite": "",
                            "sourceTitle": "<strong>Newsmax.com</strong>",
                            "iconUrl": "",
                            "sourceUrl": "<strong>Newsmax.com</strong>",
                            "url": "http://1594284.r.msn.com/?ld=4v_uhFISi1xPZZ2vr9Ba_INj9f94LWO-063RNWQORG-Aas2XHWnRLumLcJnQYawVz-n6aJj-jsLD5BsesVPaKA9rVFSUw3CRYYwXkG68AuEa1GmFbLdk2MtfhzYLwqPGzlMTQtzezOrU1BEQ7ReiEIe6RT0-2QOeBanckHEwyWH2lsuAadZwExxhB4xa9Hf-0zyMugASgC2pCyHHXeMyRPvhf2whKnE-IZdkIZ3Cn1-xiWyOXdbHNuXs0JiNUgqFGLJ4FDEa4ZFEVAnEzzacjuarZHgOhqeSKWoDZu4fRH1nZnbUEO8iPsH-kCuB2LzA-Kg8RCTh7p37ogUbsu1lERUiqp-_EQJmNzPYPAREGe-uP6WBIQqKiO1DXXeubyV5jaOEQvieGS6154"
                        }
                    }
                },
                file: {}
            }
        };
    }

    Y.namespace('mojito.controllers')[NAME] = {

        index: function (ac) {
            var start = now();

            ac.composite.execute(cfg, function (data, meta) {
                ac.done(data, meta);
                var duration = (now() - start) / 1000;
                Y.log('Duration: ' + duration + ' msec', 'warn');

                if (typeof global.iterations === 'undefined') {
                    global.iterations = 0;
                }

                global.iterations++;

                if (typeof global.totaltime === 'undefined') {
                    global.totaltime = 0;
                }

                global.totaltime += duration;

                if ((global.iterations % 100) === 0) {
                    Y.log('Average: ' + (global.totaltime / global.iterations) + ' msec', 'error');
                    global.iterations = global.totaltime = 0;

                }
            });
        }
    };

}, '0.0.1', {
    requires: ['mojito-composite-addon']
});
