#!/usr/bin/env bash

# A better class of script
set - o errexit# Exit on most errors(see the manual)
set - o errtrace# Make sure any error trap is inherited
set - o nounset# Disallow expansion of unset variables
set - o pipefail# Use last non - zero exit code in a pipeline
