#!/bin/bash

arg_string=""

for arg in "$@"; do
    args_string="${arg_string} ${arg}"
done

exec_file="`dirname $0`/../lib/node_modules/@alchmy/youtube2ipfs/lib/youtube2ipfs-cli.js"

node ${exec_file} ${args_string}

