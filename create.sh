#!/bin/bash

rm -rf mojits/Mojit*

langs="es-AR en-SG de-AT en-AU pt-BR en-CA fr-CA de-CH fr-CH it-CH es-CL es-CO es-CT de-DE da-DK es-ES es-US fi-FI fr-FR zh-HK id-ID en-IN it-IT ko-KR en-MY es-MX nl-NL nb-NO en-NZ es-PE en-PH ru-RU sv-SE th-TH zh-TW en-GB en-US es-VE vi-VN"

CONTROLLER=$( cat <<EOF
YUI.add('MOJIT_NAME', function (Y, NAME) {
    'use strict';

    var now = function() { return +new Date };

    Y.namespace('mojito.controllers')[NAME] = {
        index: function (ac) {
            ac.done({
                name: NAME,
                label: ac.intl.lang('LABEL')
            });
        }
    };

}, '0.0.1', {
    requires: [
        'mojito-intl-addon',
        'mojito-config-addon',
        'mojito-url-addon',
        'mojito-http-addon',
        'mojito-params-addon',
        'mojito-composite-addon',
        'mojito-assets-addon',
        'datatype-date'
    ]
});
EOF
)

CONFIG=$( cat <<EOF
[{
    "settings": ["master"],
    "config": {
        "WHATEVER": "whatever"
    }
}]
EOF
)

BINDER=$( cat <<EOF
YUI.add('MOJIT_NAMEBinderIndex', function (Y, NAME) {
    'use strict';

    Y.namespace('mojito.binders')[NAME] = {
        init: function (mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        bind: function () {}
    };

}, '0.0.1', {
    requires: [
        'mojito-client',
        'node-event-delegate'
    ]
});
EOF
)

CSS=$( cat <<EOF
p.MOJIT_NAME {
    font-size: 15px;
    color: red;
}
EOF
)

VIEW=$( cat <<EOF
<p id="{{mojit_view_id}}" class="MOJIT_NAME">{{label}}{{name}}</p>
EOF
)

LANG=$( cat <<EOF
YUI.add('lang/MOJIT_NAME_LANGUAGE', function (Y) {
    'use strict';
    Y.Intl.add(
        'MOJIT_NAME',
        'LANGUAGE',
        {
            LABEL: 'Label: '
        }
    );
}, '0.0.1', {
    requires: ['intl']
});
EOF
)

for (( i=1; i <= 50; i++ ))
do
    mkdir -p mojits/Mojit${i}
    mkdir -p mojits/Mojit${i}/binders
    mkdir -p mojits/Mojit${i}/assets
    mkdir -p mojits/Mojit${i}/views
    mkdir -p mojits/Mojit${i}/lang
    echo ${CONTROLLER//MOJIT_NAME/Mojit${i}} > mojits/Mojit${i}/controller.server.js
    echo ${CONFIG} > mojits/Mojit${i}/defaults.json
    echo ${BINDER//MOJIT_NAME/Mojit${i}} > mojits/Mojit${i}/binders/index.js
    echo ${CSS//MOJIT_NAME/Mojit${i}} > mojits/Mojit${i}/assets/Mojit${i}.css
    echo ${VIEW//MOJIT_NAME/Mojit${i}} > mojits/Mojit${i}/views/index.mu.html
    for lang in $langs
    do
        L=${LANG//MOJIT_NAME/Mojit${i}}
        L=${L//LANGUAGE/${lang}}
        echo ${L} > mojits/Mojit${i}/lang/Mojit${i}_${lang}.js
    done
done
