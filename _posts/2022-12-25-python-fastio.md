---
title: "Python FastIO - 프로그래밍 대회를 위한 파이썬 빠른 입출력"
categories: [cp-algorithm]
tags: [python, trick]
---

프로그래밍 대회나 기업 코딩 테스트에서는 제한 시간이 있기 때문에 최대한 빠르게 입출력을 처리하는 것이 중요하다. 특히, C언어에 비해 굉장히 느린 Python은 입출력 자체만으로 시간 초과가 나기도 한다. 따라서 Python을 주력 언어로 정했다면, 빠른 입출력을 위한 방법은 기본적으로 숙지하고 있어야 한다.

## 기본 입력

기본 제공되는 `input()`의 경우, 다음과 같이 표준입출력 STDIN으로 메세지 출력 후 입력을 문자열로 받아온다.

```python
name = input("input name: ")
print(name)
```

실행 결과는 다음과 같다.

```bash
input name: gumgood
gumgood
```

## 빠른 입력

채점 사이트에서는 표준 입출력이 파일로써 준비되어 있다. 따라서 입력을 도와줄 메세지가 필요없기 떄문에 오직 입력만 받는 `sys.stdin.readline()`을 사용하면 더 빠르게 입력받을 수 있다.

```python
import sys

name = sys.stdin.readline()
print(name)
```

다음과 같이 `input`을 override하여 더 간편하게 사용할 수 있다.

```python
import sys
input = sys.stdin.readline

name = input()
print(name)
```

## 더 빠른 입력

위 과정은 채점 파일을 프로그램의 STDIN로 넣어준 다음 STDIN을 다시 문자열로 입력받고 있다. 따라서 다음과 같이 OS 모듈과 입출력 IO모듈을 이용하여 파일로부터 직접 입력받으면 시간을 더욱 단축시킬 수 있다.

```python
import os, io, sys
input = io.BytesIO(os.read(0, os.fstat(0).st_size)).readline

name = input()
print(name)
```

## 기본 출력

일반적으로 배열은 다음과 같이 출력할 수 있다.

```python
arr = [21, 30, 12, 40]
print(*arr)
```

## 빠른 출력

입력과 마찬가지로 `print()`대신 `sys.stdout.write()`를 사용하면 시간을 단축할 수 있다. 또한 배열의 각 원소를 한 문자열로 `join`하여 출력하는 것이 더 빠르다.

```python
import sys
print = sys.stdout.write

arr = [1, 2, 3, 4]
print(" ".join(map(str, arr)) + "\n")
```

Python은 언어가 굉장히 무겁기 때문에 문제를 제대로 해결하더라도 입출력 처리를 안하면 통과 못하는 경우가 많다. 반드시 알아놓도록 하자.