#!/bin/bash

rm -rf mojits/Mojit*

langs="es-AR en-SG de-AT en-AU pt-BR en-CA fr-CA de-CH fr-CH it-CH es-CL es-CO es-CT de-DE da-DK es-ES es-US fi-FI fr-FR zh-HK id-ID en-IN it-IT ko-KR en-MY es-MX nl-NL nb-NO en-NZ es-PE en-PH ru-RU sv-SE th-TH zh-TW en-GB en-US es-VE vi-VN"

CONTROLLER=$( cat <<EOF
YUI.add('MOJIT_NAME', function (Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        index: function (ac) {
            ac.done({
                name: NAME,
                label: ac.intl.lang('LABEL')
            });
        }
    };

}, '0.0.1', {
    requires: ['mojito-intl-addon']
});
EOF
)

VIEW=$( cat <<EOF
<p id="{{mojit_view_id}}">{{label}}{{name}}</p>
EOF
)

LANG=$( cat <<EOF
YUI.add("lang/MOJIT_NAME_LANGUAGE", function (Y) {
    "use strict";
    Y.Intl.add(
        "MOJIT_NAME",
        "LANGUAGE",
        {
            "LABEL": "Label: "
        }
    );
}, "0.0.1", {
    requires: ["intl"]
});
EOF
)

for (( i=1; i <= 50; i++ ))
do
    mkdir -p mojits/Mojit${i}
    mkdir -p mojits/Mojit${i}/views
    mkdir -p mojits/Mojit${i}/lang
    echo ${CONTROLLER//MOJIT_NAME/Mojit${i}} > mojits/Mojit${i}/controller.server.js
    echo $VIEW > mojits/Mojit${i}/views/index.mu.html
    for lang in $langs
    do
        L=${LANG//MOJIT_NAME/Mojit${i}}
        L=${L//LANGUAGE/${lang}}
        echo ${L} > mojits/Mojit${i}/lang/Mojit${i}_${lang}.js
    done
done
