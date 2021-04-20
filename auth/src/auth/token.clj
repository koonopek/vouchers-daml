(ns auth.token
  (:require 
            [buddy.sign.jwt :as jwt]
            ))

(def SECRET "alamakota")

(defn token-payload
  [actAs readAs]
  {"https://daml.com/ledger-api" {
    :ledgerId "daml-voucher"
    :applicationId "daml-voucher"
    :actAs [actAs]
    :readAs (if (nil? readAs) [] [readAs])  
  }})

(defn sign-payload
  [payload]
  (jwt/sign payload SECRET))

(defn compute-token
  [actAs readAs]
  (-> 
    (token-payload actAs readAs)
    sign-payload
  )
)