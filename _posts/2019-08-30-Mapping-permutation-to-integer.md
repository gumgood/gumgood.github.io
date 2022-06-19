---
layout: post
title: "Mapping Permutation to Integer"
categories: [algorithm]
tags: [trick]
---

원문 : <https://stackoverflow.com/questions/1506078>

permutation of n elements가 있을 때, integer로 mapping하는 방법에 대해 설명한다. n!의 permutation이 있을 수 있고, 이를 n!가지의 정수에 1:1 mapping하는 것이 목적이다.

n개의 원소로 이루어진 permutation을 설명할 때, 첫 번째 원소가 있을 수 있는 위치는 n가지가 있다. 따라서 이 원소의 위치를 0~n-1 사이의 수로 나타낼 수 있다.  그 다음 원소가 있을 수 있는 위치는 남은 n-1가지이다. 그래서 이 원소의 위치를 0~n-2 사이의 수로 나타낼 수 있다. 이를 위치를 나타내는 n개의 수를 얻을 때까지 계속 반복한다.

n=5인 경우를 예로 들어, 'abcde'에서 'caebd'로 가는 경우를 생각해보자.

- a, 첫 번째 원소로, 두 번째에 위치한다. 따라서 인덱스는 **1**이다.
- b는 네 번째에 위치하므로 인덱스는 3이 되어야 한다. 그런데 남은 것 중에 세 번째이므로, 인덱스는 **2**이다.
- c는 첫 번째에 위치하므로, 인덱스는 **0**이다.
- d는 마지막에 위치하고, (남은 두 인덱스 중) 인덱스는 **1**이다.
- e는 유일하게 남은 위치에 잇으므로 인덱스는 **0**이다.

따라서 인덱스 수열 **{1, 2, 0, 1, 0}**을 얻는다.

이미 이진수 'xyz'는 'z + 2y + 4x'를 의미한다는 것을 알고 있다. 10진수의 경우 'z + 10y + 100x'이다. 각 자리수는 어떤 가중치가 곱해지고 각 결과들을 더한다. 가중치의 확실한 패턴은 b진법일때 k번째 인덱스의 자리수에 가중치 w=b^k가 곱해지는 것이다. (자리수의 인덱스는 오른쪽부터 시작한다. 첫 번째 자리수는 가장 오른쪽에 있는 수를 의미한다.)

각 자리수의 가중치가 이러한 패턴을 따르는 이유는 '0~k 자리수로 나타낼 수 있는 가장 높은 숫자'는 'k+1 자리수로 나타낼 수 있는 가장 낮은 숫자'보다 정확히 1만큼 낮기 때문이다. 이진수에서 0111은 1000보다 정확히 1만큼 낮다. 십진수에서 099999는 100000보다 정확히 1만큼 낮다.

## Encoding to variable-base

그 다음 숫자와의 간격이 정확히 1인 것은 매우 중요한 규칙이다. 이를 알면, 앞서 구한 인덱스 수열을 variable-base number로 변환할 수 있다. 각 자리수의 base는 자리수의 경우의 수이다. 10진법에서 각 자리수은 10가지의 가능성을 가지고, 우리의 시스템에서는 가장 오른쪽 d자리수는 경우의 수가 1이고 가장 왼쪽 자리수는 경우의 수가 n이다. 그러나 가장 오른쪽 자리수(인덱스 수열에서 마지막 수)는 항상 0이므로 생략한다. 우리는 2에서 n까지 base만 남긴다는 뜻이다. 일반적으로, k번째 자리수는 b[k] = k + 2의 base를 가진다. 자리수 k에 허용되는 가장 높은 값은 h[k] = b[k] - 1 = k + 1이다.

우리의 규칙은 자리수의 가중치 w[k]에 대해 i=0 ~ i=k에서 h[i]*w[i]의 합이 1*w[k+1]과 같이야 한다는 것이다. 반복적으로 w[k+1] = w[k] + h[k]*w[k] = w[k]*(h[k] + 1)이다. 첫 번째 가중치 w[0]는 항상 1이 되어야 한다. 거기서 시작하여 다음과 같은 값을 얻는다.

```
k    h[k] w[k]    

0    1    1  
1    2    2    
2    3    6    
3    4    24   
...  ...  ...
n-1  n    n!  
```

(w[k-1] = k!로의 일반화를 귀납법으로 쉽게 증명할 수 있다.)

우리가 수열로부터 얻는 변환된 수는 k=0 ~ k=n-1에서 s[k]*w[k]의 합이 될 것이다. 여기서 s[k]는 수열에서 k번째 원소(오른쪽에서 0부터 시작하는)이다. 예를 들어 {1, 2, 0, 1, 0} 수열에서 위에서 말했던대로 가장 오른쪽 원소를 빼면 {1, 2, 0, 1}가 되고, 합계는 1*1 + 0*2 + 2*6 + 1*24 = 37이다.

모든 인덱스에 대해 가장 높은 위치에 있는 경우, 순열은 {4, 3, 2, 1, 0}가 되고 이는 119로 변환될 것이다. 인코딩시 어떠한 수도 건너뛰지 않도록 가중치를 선택했기 때문에 0에서 119사이 모든 수는 유효한 값을 가진다. 우리가 예로 들었던 n=5에서, 각기 다른 permutation에 대해 정확히 5!=120가지의 수이다. 따라서 우리는 인코딩한 수가 가능한 모든 permutationdmf 명시함을 알 수 있다.

## Decoding from variable-base

디코딩은 이진법이나 십진법으로 변환하는 과정과 비슷하다. 공통된 알고리즘은 다음과 같다:

```cpp
int number = 42;
int base = 2;
int[] bits = new int[n];

for (int k = 0; k < bits.length; k++){
    bits[k] = number % base;
    number = number / base;
}
```

variable-base number에 적용하면 다음과 같다:

```cpp
int n = 5;
int number = 57;

int[] sequence = new int[n - 1];
int base = 2;

for (int k = 0; k <sequence.Length; k++){
    sequence[k] = number % base;
    number = number / base;

    base++; // b[k+1] = b[k] + 1
}
```

37은 정확하게 {1, 2, 0, 1}로 디코딩된다(코드 상에서는 {1, 0, 2, 1}순이지만 적절하게 인덱싱하기만 하면 된다). 우리는 가장 오른쪽에 0을 추가해주기만 하면 원래 수열인 {1, 2, 0, 1, 0}을 얻을 수 있다(마지막 원소는 위치는 오직 한 곳임을 유념하라).

## Permuting a list using an sequence

위의 알고리즘을 사용하여 특정 인덱스 수열를 따르는 리스트로 배치할 수 있습니다. 불행하게도 $O(n^2)$입니다.

```cpp
int n = 5;
int[] sequence = new int[] { 1, 2, 0, 1, 0 };
char[] list = new char[] { 'a', 'b', 'c', 'd', 'e' };
char[] permuted = new char[n];
bool[] set = new bool[n];

for (int i = 0; i < n; i++)
{
    int s = sequence[i];
    int remainingPosition = 0;
    int index;

    // Find the s'th position in the permuted list that has not been set yet.
    for (index = 0; index < n; index++)
    {
        if (!set[index])
        {
            if (remainingPosition == s)
                break;

            remainingPosition++;
        }
    }

    permuted[index] = list[i];
    set[index] = true;
}
```

## Common representation of permutations

일반적으로 우리가 한 것처럼 직관적이지 않은 permutation 표현을 하지 않고, 각 원소의 절대적인 위치로 표현한다. 앞서 예로 들었던 'abcde'에서 'caebd'로의 {1, 2, 0, 1, 0}는 보통 {1, 3, 0, 4, 2}로 나타낸다. 이 표현에서는 0~4(일반적으로 0~n-1)의 인덱스는 정확히 한번식 발생한다.

이러한 형식의 permutation은 적용은 쉬운 편이다:

```cpp
int[] permutation = new int[] { 1, 3, 0, 4, 2 };

char[] list = new char[] { 'a', 'b', 'c', 'd', 'e' };
char[] permuted = new char[n];

for (int i = 0; i < n; i++)
{
    permuted[permutation[i]] = list[i];
}
```

반대 작업도 비슷하다:

```cpp
for (int i = 0; i < n; i++)
{
    list[i] = permuted[permutation[i]];
}
```

## Converting from our representation to the common representation

인덱스 수열을 이용해 리스트를 치환하는 알고리즘을 identity permutation인 {0, 1, 2, ..., n-1}에 적용하면 우리는 같은 형식으로 표현된 inverse permutation을 얻는다. (예에서는 {2, 0 ,4, 1, 3})

non-inverted permutation을 얻으려면, 밑의 permutation 알고리즘을 적용하면된다:

```cpp
int[] identity = new int[] { 0, 1, 2, 3, 4 };
int[] inverted = { 2, 0, 4, 1, 3 };
int[] normal = new int[n];

for (int i = 0; i < n; i++)
{
    normal[identity[i]] = list[i];
}
```

또는 inverse permutation algorithm을 써서 permutation을 바로 적용할 수 있다.

```cpp
char[] list = new char[] { 'a', 'b', 'c', 'd', 'e' };
char[] permuted = new char[n];

int[] inverted = { 2, 0, 4, 1, 3 };

for (int i = 0; i < n; i++)
{
    permuted[i] = list[inverted[i]];
}
```

common form의 permutation을 적용하는 알고리즘은 $O(n)$꼴이지만, 우리 정한 형식으로 적용할 때는 $O(n^2)$임을 유의하자. 만약 permutation을 여러 번 적용해야하는 경우, 먼저 common representation으로 변환하라.
