#!/usr/bin/env bash

# A better class of script
set - o errexit# Exit on most errors(see the manual)
set - o errtrace# Make sure any error trap is inherited
set - o nounset# Disallow expansion of unset variables
set - o pipefail# Use last non - zero exit code in a pipeline


function main() {
  # Stop
  echo;
  echo "If existing, remove stacks: "
  ./rundown.sh

  # Create Network
  echo; echo "If not existing, create our network: "

  NTW_PROXY="app"
    if [ ! "$(docker network ls --filter name=${NTW_PROXY} -q)" ]; then
      docker network create --driver overlay --attachable --opt encrypted "${NTW_PROXY}"
      echo "Network: ${NTW_PROXY} was created."
    else
      echo "Network: ${NTW_PROXY} already exist."
    fi

  echo; echo "Show network...";
  docker network ls | grep "ntw_";
  echo; echo; sleep 2;

  echo "Start the stacks ...";
}

# --- Entrypoint
main "$@"
