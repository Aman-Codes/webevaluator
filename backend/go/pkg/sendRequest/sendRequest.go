package sendRequest

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/Aman-Codes/backend/go/pkg/log"
	"github.com/gin-gonic/gin"
)

func SendGetRequest(Url string) (interface{}, error) {
	log.Infof("making get request to %s", Url)
	req, err := http.NewRequest("GET", Url, nil)
	if err != nil {
		log.Errorf("failed to create a new http request, err %v", err)
		return nil, err
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Errorf("failed to execute http request, err %v", err)
		return nil, err
	}
	defer resp.Body.Close()
	log.Infof("resp.Body is %v", resp.Body)
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Errorf("failed to read response, err %v", err)
		return nil, err
	}
	var objmap map[string]interface{}
	err = json.Unmarshal(body, &objmap)
	if err != nil {
		if err != nil {
			log.Errorf("unable to unmarshal body into objmap", err)
			return nil, err
		}
	}
	// log.Infof("objmap is %v", objmap)
	return objmap, nil
}

func SendGetRequestWrapper(c *gin.Context, Url string) {
	resp, err := SendGetRequest(Url)
	if err != nil {
		c.JSON(400, gin.H{
			"status": "error",
			"error":  err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"status":   "success",
		"response": resp,
	})
}
