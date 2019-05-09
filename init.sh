#!/bin/bash

# Output sample config/env files
echo "const encryptionKey = 'aEXACTLYthirtyTWOcharacterSTRING'

module.exports = {
    encryptionKey,
}" > ./config/keys.js

echo "
Change:
    config/keys.js
    config/config.js
    config/meta.js
"

