(ns auth.access-resolver
  (:require 
  [clojure.string :as str]
  [failjure.core :as f]
            ))


(def ACL_FILE "resources/ACL")

(def KEYS [:name :password :actAs :readAs])

(defn parse-acl-line
  [line]
    (zipmap KEYS (str/split line #":")))

(defn get-acl-map
  []
  (-> (slurp ACL_FILE)
      (#(str/split % #"\n"))
      (#(map parse-acl-line %))
  ))

(defn find-by-name
  [name acl-map]
  (first (filter #(= (:name %) name) acl-map)))

(defn resolve-grants
  [name password]
  (let [acl-record (find-by-name name (get-acl-map))]
    (if (or (nil? acl-record) (not (= (:password acl-record) password)))
          (f/fail "Wrong password, or non existing user")
          acl-record
   )
  ))