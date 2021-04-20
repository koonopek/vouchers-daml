(ns auth.handler
  (:require [compojure.core :refer [GET defroutes POST OPTIONS]]
            [compojure.route :as route]
            [buddy.sign.jwt :as jwt]
            [auth.token :as token]
            [auth.access-resolver :as acl]
            [failjure.core :as f]
            [jumblerg.middleware.cors :refer [wrap-cors]]
            [ring.middleware.json :refer [wrap-json-response wrap-json-body]]))


(def SECRET "alamakota")

(defn get-body
  [request query]
  (get-in request (concat [:body] query)))

(defn auth-error
  [message]
  {:status 401 :body message}
)

;; return token assigned to given user
(defn auth
  [request]
  (f/if-let-failed? [grants (acl/resolve-grants (get-body request ["username"]) (get-body request ["password"]))]
    { :status 401 :body {:message grants}}
    { :status 200 :body {:access_token (token/compute-token (:actAs grants) (:readAs grants)) } }
  ))

(defroutes app-routes
  (GET "/" [] {:status 200 :body "ok"})
  (POST "/auth" [:as request] (auth request))
  (route/not-found "Not found"))


(defn wrap-print-request [handler]
  (fn [request]
    (let [response (handler request)]
      (println request)
      (println "----")
      (println response)
      (println "====")
      response)))


(def un-corse-routes (wrap-cors app-routes #".*"))

(def app
  (-> un-corse-routes
  identity
  wrap-print-request
  wrap-json-body
  wrap-json-response
  ))

