#!/bin/bash
# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment
echo "window._env_ = {" >> ./env-config.js

# Read each line in .env file
# Each line represents key=value pairs
while IFS='=' read -r varname varvalue || [[ -n "$line" ]]; do
  # Skip lines starting with # or empty lines
  [[ "$varname" =~ ^#.*$ ]] && continue
  [[ -z "$varname" ]] && continue

  # Trim whitespace from varname and varvalue
  varname=$(echo "$varname" | xargs)
  varvalue=$(echo "$varvalue" | xargs)

  # Escape special characters in varvalue
  varvalue=$(echo "$varvalue" | sed 's/\\/\\\\/g; s/"/\\"/g')

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ./env-config.js
done < .env

# Close the JavaScript object
echo "}" >> ./env-config.js
