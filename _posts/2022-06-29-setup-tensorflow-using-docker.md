---
title: "Ubuntu 서버에 Docker로 Tensorflow 개발 환경 구축하기"
categories: [etc, setting]
tags: [docker, tensorflow, linux]
---

Ubuntu 서버에 Tensorflow 개발 환경을 구축할 일이 생겼다. 다양한 환경의 여러 오픈 소스들을 돌려보기도 해야하고, 혼자 쓰는 서버가 아니기 때문에 Docker를 활용하기로 했다. 하지만 세팅하는 과정이 생각보다 어려워서 이렇게 따로 정리해두려고 한다.

## 1. 서버 GPU 확인

서버에는 NVIDIA GPU가 장착되어 있고 이를 지원하기 위한 NVIDIA-docker, CUDA, cuDNN이 설치되어 있다. 특히 GPU를 지원하는 **NIVDIA-docker 버전**이 아닌 경우, GPU 할당이 제대로 되지 않기 때문에 다음 명령어로 한 번 확인해주도록 하자.

```bash
docker run --gpus all --rm nvidia/cuda nvidia-smi
```

모든 GPU를 할당해서 1회성으로 컨테이너를 만든 후, GPU 상태를 확인하고 종료하는 명령이다. 만약, `nvidia/cuda` 이미지를 다운로드 받아 놓은 적이 없다면 자동으로 Docker Hub에서 해당 이미지를 찾아 다운받은 후 빌드하여 실행한다.

## 2. Tensorflow GPU 확인

위에서 서버에 있는 docker에서 모든 GPU가 잘 인식되는 걸 확인했다. 이제 `tensorflow-gpu` 이미지로 Tensorflow에서 GPU를 잘 할당받는지 확인해보자.

```bash
docker run --gpus all --rm -it tensorflow/tensorflow:2.2.0-gpu bash
```

`tensorflow:2.2.0-gpu`버전의 이미지로 1회성 컨테이너를 만든 후 실행하는 명령이다. 컨테이너가 실행하는 쉘에서 `apt list --installed`이나 `pip list`로 설치된 환경을 확인한다. 또 Python을 실행해서 간단한 Tensorflow 예제를 통해 GPU를 할당해보도록 한다.

## 3. Dockerfile 작성

이제 필요한 개발 환경에 맞게 Dockerfile을 먼저 작성한다. 주로 Tensorflow 이미지에 포함되지 않은 라이브러리를 설치하거나, 텐서보드를 위한 포트 등을 설정한다.

## 4. Dockerfile 기반 이미지 생성

```bash
docker build --rm -t tf-test:0.1 .
```

작성한 Dockerfile로 이미지를 생성하는 명령이다. 옵션에 대한 자세한 설명은 다음과 같다.

1. `--rm`: 빌드 성공 시 빌드 때 만들어진 임시 컨테이너들을 삭제하는 옵션
2. `-t tf-test`: 이미지 이름을 `tf-test`로 지정
4. `0.1`: 이미지 버전 (생략하면 `latest`)
5. `.`: Dockerfile 경로

## 5. 빌드한 이미지로 컨테이너 생성 후 실행하기

```bash
docker run --gpus all -itd --name tf_server tf-test:0.1 /bin/bash
```

위에서 빌드한 이미지로 컨테이너를 만들어 실행한다. 나는 이 컨테이너를 하나의 서버처럼 쓰고 싶은데, Docker는 더 이상 실행할 프로세스가 없으면 컨테이너를 종료한다. 따라서 쉘 하나를 백그라운드에 실행시켜놓는 방법으로 컨테이너를 계속 켜둔다. 그리고 VSCode와 같은 경로를 통해 또 다른 쉘로 접근해서 작업 후 종료하는 방법으로 이 컨테이너를 서버처럼 쓸 수 있다.

구체적으로, 표준 입력으로 사용자의 명령을 기다리는 Bash를 띄워놓는데 백그라운드로 실행 중이기 때문에 어떠한 명령도 해당 Bash에 전달되지 않는다. 이를 이용해 무한히 대기하는 상태를 만들어 놓는 것이다. 당연하게도 해당 Bash에 `docker attach`로 접근해서 종료하면 컨테이너가 종료된다.

1. `--gpus all`: 가능한 모든 GPU 사용
2. `-it`: 표준 입출력으로 컨테이너 안의 Bash에 명령을 전달할 수 있게 하는 옵션
3. `-d`: 컨테이너를 백그라운드에서 실행하도록 하는 옵션 (`docker attach`로 접근 가능)
4. `--name tf_server`: 컨테이너 이름을 `tf_server`로 지정
5. `tf-test:0.1`: 실행할 이미지이름과 버전
6. `/bin/bash`: 컨테이너에서 실행할 명령어

이후 지정한 컨테이너 이름을 이용해서 실행하거나 종료하면 된다. `docker start tf_server`로 실행하고 `docker stop tf_server`로 종료할 수 있다.

> `docker run`으로 매번 실행하면 컨테이너가 새로 빌드되어 이전에 같은 이름으로 만든 컨테이너는 사라진다. 컨테이너를 초기화하려는게 아니라면 반드시 `docker start`와 `docker stop`으로 실행/종료하도록 하자.
{: .prompt-warning }