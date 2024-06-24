#!/bin/bash

find src/cjs -type f -name "*.js" -exec bash -c 'mv "$0" "${0%.js}.cjs"' {} \;

replace_in_file() {
    local file="$1"
    local regex="$2"
    local replacement="$3"

    sed -i "s/${regex}/${replacement}/g" "$file"
}

search_pattern='__importDefault(require("\([^"]*\)\.js"));'
replace_pattern='__importDefault(require("\1.cjs"));'

find src/cjs -type f -name "*.cjs" | while read -r file; do
    replace_in_file "$file" "$search_pattern" "$replace_pattern"
done
