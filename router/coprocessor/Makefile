include .env

container:
	mkdir -p build
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-s" -a -installsuffix cgo -o build/coprocessor.amd64 .
	docker build . -t coprocessor

push: container
	docker tag coprocessor gcr.io/${GCS_PROJECT}/coprocessor
	docker push gcr.io/${GCS_PROJECT}/coprocessor

deploy:
	gcloud run deploy coprocessor --image gcr.io/${GCS_PROJECT}/coprocessor --allow-unauthenticated \
		--region us-east1 --platform managed

set_project:
	gcloud config set project ${GCS_PROJECT}
	gcloud auth configure-docker