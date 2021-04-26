FROM digitalasset/daml-sdk:1.12.0
COPY token token
ENTRYPOINT [ "daml", "json-api", "--access-token-file=token", "--address=0.0.0.0",  "--ledger-host=127.0.0.1", "--ledger-port=6865", "--http-port=7575" ]