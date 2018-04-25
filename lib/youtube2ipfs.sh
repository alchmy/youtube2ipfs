#!/bin/bash

args_string=""

for arg in "$@"; do
    args_string="${args_string} ${arg}"
done

exec_file="`dirname $0`/../lib/node_modules/@alchmy/youtube2ipfs/lib/youtube2ipfs.js"

node ${exec_file} ${args_string}

