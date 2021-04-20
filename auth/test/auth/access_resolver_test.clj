(ns auth.access-resolver-test
  (:require [clojure.test :refer [deftest testing is]]
            [auth.access-resolver :refer [parse-acl-line find-by-name]]))

(deftest access-parse
  (testing "All fields"
    (let [line "bank1:bank1:bank1:IssuerGroup"]
      (is (= (parse-acl-line line) {:name "bank1", :password "bank1", :actAs "bank1", :readAs "IssuerGroup" }))))
  (testing "Last field empty"
    (let [line "bank1:bank1:bank1:"]
      (is (= (parse-acl-line line) {:name "bank1", :password "bank1", :actAs "bank1" }))))
  (testing "First field empty"
    (let [line ":bank1:bank1:IssuerGroup"]
      (is (= (parse-acl-line line) {:name "" :password "bank1", :actAs "bank1", :readAs "IssuerGroup" }))))
  (testing "Middle field empty"
    (let [line "bank1:bank1::IssuerGroup"]
      (is (= (parse-acl-line line) {:name "bank1" :password "bank1", :actAs "", :readAs "IssuerGroup" }))))
)

(deftest get-by-name
  (testing "one matching record"
  (let [acl-map [{:name "lutek", :password "bank1", :actAs "bank1", :readAs "IssuerGroup"}]]
    (is (= (find-by-name "lutek" acl-map) {:name "lutek", :password "bank1", :actAs "bank1", :readAs "IssuerGroup"}))
  )))