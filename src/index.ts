import { Resolver } from "@stoplight/json-ref-resolver"
import { Spectral } from "@stoplight/spectral-core"
import { truthy } from "@stoplight/spectral-functions"
import { oas } from "@stoplight/spectral-rulesets"

const resolver = new Resolver({
  resolvers: {
    file: {
      resolve(uri: URI) {
        return new Promise((resolve, reject) => {
          const href = uri.href()

          return fetch(href)
            .then(data => data.text())
            .then(resolve)
            .catch(() => reject(`Error reading file "${href}"`))
        })
      },
    },
  },
})

const spectral = new Spectral({resolver})
spectral.setRuleset({
  // @ts-ignore
  extends: [[oas, "off"]],
  rules: {
    "contact-properties": true,
    "duplicated-entry-in-enum": true,
    "info-contact": true,
    "info-description": true,
    "info-license": true,
    "path-params": true,
    "license-url": true,
    "no-script-tags-in-markdown": true,
    "no-$ref-siblings": true,
    "oas3-api-servers": true,
    "oas3-examples-value-or-externalValue": true,
    "oas3-operation-security-defined": true,
    "oas3-parameter-description": true,
    "oas3-schema": true,
    "oas3-server-trailing-slash": true,
    "oas3-valid-media-example": true,
    "oas3-valid-schema-example": true,
    "oas3-unused-component": true,
    "openapi-tags": true,
    "operation-description": true,
    "operation-operationId": true,
    "operation-operationId-unique": true,
    "operation-parameters": true,
    "operation-success-response": true,
    "operation-tag-defined": true,
    "operation-tags": true,
    "path-declarations-must-exist": true,
    "path-keys-no-trailing-slash": true,
    "path-not-include-query": true,
    "tag-description": true,
    "typed-enum": true,
    "nc-oas3-audience": {
      description: "The API audience from the point of customer view is needed.",
      message: "Missing the {{property}}",
      given: "$.info.x-nc-api-audience",
      severity: "warn",
      then: {
        function: truthy,
      },
    },
  },
})

fetch("./root.yaml")
  .then(data => data.text())
  .then(text => spectral.run(text))
  .then(console.log)
