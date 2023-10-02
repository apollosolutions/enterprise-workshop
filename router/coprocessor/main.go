package main

import (
	"encoding/json"
	"net/http"
	"os"

	log "github.com/sirupsen/logrus"

	"github.com/julienschmidt/httprouter"
)

func runProcessor(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	var cr CoprocessorRequest

	err := json.NewDecoder(r.Body).Decode(&cr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	switch cr.Stage {
	case "RouterResponse":

		cr.Body, err = validateCard(cr.Body)
		if err != nil {

			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		data, _ := json.Marshal(cr)
		log.Warnf(string(data))

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(cr)
	default:
		log.Errorf("Co-processor does not support this stage: %s", cr.Stage)
		http.Error(w, "Co-processor does not support this stage.", http.StatusBadRequest)

	}

}

func main() {
	router := httprouter.New()
	router.POST("/", runProcessor)

	log.Fatal(http.ListenAndServe(":8080", router))
}

func init() {
	// Log as JSON instead of the default ASCII formatter.
	log.SetFormatter(&log.JSONFormatter{})

	// Output to stdout instead of the default stderr
	// Can be any io.Writer, see below for File example
	log.SetOutput(os.Stdout)

	// Only log the warning severity or above.
	log.SetLevel(log.WarnLevel)
}
