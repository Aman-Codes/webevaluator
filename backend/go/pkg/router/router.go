package router

import (
	"github.com/Aman-Codes/backend/go/pkg/invoke"
	"github.com/Aman-Codes/backend/go/pkg/log"
	"github.com/Aman-Codes/backend/go/pkg/sendRequest"
	"github.com/Aman-Codes/backend/go/pkg/ssl"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type URL struct {
	URL string `json:"URL" binding:"required"`
}

func Router() {
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/status", func(c *gin.Context) {
		log.Info("hit the status route")
		c.JSON(200, gin.H{
			"status": "success",
		})
	})
	router.POST("/crawl", func(c *gin.Context) {
		log.Info("hit the crawl route")
		var url URL
		c.BindJSON(&url)
		log.Infof("url received is %s", url.URL)
		urlList, mediaList, err := invoke.Invoke(url.URL)
		if err != nil {
			c.JSON(200, gin.H{
				"status": "error",
				"data":   err.Error(),
			})
			return
		}
		c.JSON(200, gin.H{
			"status":    "success",
			"urlList":   urlList,
			"mediaList": mediaList,
		})
	})
	router.POST("/sslapi", func(c *gin.Context) {
		log.Info("hit the ssl api route")
		var url URL
		c.BindJSON(&url)
		log.Infof("url received is %s", url.URL)
		// res, err := ssl.GetSSLInfo(url.URL)
		// log.Infof("data is %v", res)
		api := "https://api.ssllabs.com/api/v3/analyze?host="
		u, err := ssl.GetHostName(url.URL)
		if err != nil {
			c.JSON(200, gin.H{
				"status": "error",
				"data":   err.Error(),
			})
			return
		}
		api += u
		data, err := sendRequest.SendGetRequest(api)
		log.Infof("data is %v", data)
		if err != nil {
			c.JSON(200, gin.H{
				"status": "error",
				"data":   err.Error(),
			})
			return
		}
		c.JSON(200, gin.H{
			"status": "success",
			"data":   data,
		})
	})
	router.POST("/ssl", func(c *gin.Context) {
		log.Info("hit the ssl route")
		var url URL
		c.BindJSON(&url)
		log.Infof("url received is %s", url.URL)
		data, err := ssl.GetSSLInfo(url.URL)
		if err != nil {
			c.JSON(200, gin.H{
				"status": "error",
				"data":   err.Error(),
			})
			return
		}
		c.JSON(200, gin.H{
			"status": "success",
			"data":   data,
		})
	})

	router.Run(":8080")
}
