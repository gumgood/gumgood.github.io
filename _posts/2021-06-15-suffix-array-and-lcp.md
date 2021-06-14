---
layout: post
title: "접미사 배열과 LCP 배열(Suffix Array and LCP Array)"
description: "접미사 배열과 LCP 배열소개 및 연습문제"
tags: [algorithm]
---

## 접미사(Suffix)

문자열 $s$의 $i$번째 접미사란, $s$의 $i$번째 글자부터 마지막 글자까지 포함하는 부분문자열을 뜻합니다. 예를 들면, $s=\mathsf{GATAGACA}$의 접미사를 순서대로 나타내면 다음과 같습니다.

$$
\begin{array}{|c|c|}

\hline

\mathsf{i} & \mathsf{i'th \ suffix} \\

\hline

\begin{array}{c}
\mathsf{0} \\
\mathsf{1} \\
\mathsf{2} \\
\mathsf{3} \\
\mathsf{4} \\
\mathsf{5} \\
\mathsf{6} \\
\mathsf{7} 
\end{array}

&

\begin{array}{l}
\mathsf{GATAGACA} \\
\mathsf{ATAGACA} \\
\mathsf{TAGACA} \\
\mathsf{AGACA} \\
\mathsf{GACA} \\
\mathsf{ACA} \\
\mathsf{CA} \\
\mathsf{A} 
\end{array}

\\

\hline

\end{array}
$$

## 접미사 배열(Suffix Array)

접미사들을 사전 순으로 나열한 배열이 **접미사 배열**입니다. 이 때, 부분 문자열 자체를 저장하는 대신 간단하게 접미사가 시작하는 인덱스를 저장합니다. 예시로 든 문자열 $s$의 접미사를 사전 순으로 나열하면 다음과 같습니다.

$$
\begin{array}{|c|c|}

\hline

\mathsf{sa[i]} & \mathsf{suffix \ array} \\

\hline

\begin{array}{c}
\mathsf{7} \\
\mathsf{5} \\
\mathsf{3} \\
\mathsf{1} \\
\mathsf{6} \\
\mathsf{4} \\
\mathsf{0} \\
\mathsf{2} 
\end{array}

&

\begin{array}{l}
\mathsf{A} \\
\mathsf{ACA} \\
\mathsf{AGACA} \\
\mathsf{ATAGACA} \\
\mathsf{CA} \\
\mathsf{GACA} \\
\mathsf{GATAGACA} \\
\mathsf{TAGACA} 
\end{array}

\\

\hline

\end{array}
$$

문자열 $s$의 접미사 배열 $\mathsf{sa}$는 $\mathsf{[7, 5, 3, 1, 6, 4, 0, 2]}$가 됩니다.

## Manber-Myers Algorithm

주어진 문자열의 접미사 배열을 구하는 Manber-Myers 알고리즘에 대해 알아봅시다. 알고리즘은 몇 번의 반복적인 단계로 이뤄지는데, $k$번째 단계에서는 접미사를 앞부터 $2^k$개의 문자를 기준으로 정렬합니다. 총 $\lceil \log n \rceil$번의 단계를 거치고 나면, 모든 접미사를 사전 순으로 얻게 됩니다. 

각 단계마다 이전 단계에서 정렬된 순서를 이용하여 접미사 간의 대소 비교를 $O(1)$만에 할 수 있기 때문에 $O(n \log n)$ 또는 $O(n)$에 정렬을 하는 것이 가능합니다. 따라서 총 시간복잡도 $O(n \log^2 n)$ 또는 $O(n \log n)$에 구현할 수 있습니다.

### 접미사간 대소 비교

앞부터 $d$개의 문자를 기준으로 대소 비교하는 방법을 알아봅시다. 어떤 $i$번째 접미사의 앞부터 $d$개의 문자는 두 부분의 연속한 $d/2$개의 문자로 나눠 생각할 수 있습니다.

$$
\overbrace{\underbrace{\mathsf{G \ A}}_{d/2} \ \underbrace{\mathsf{T \ A}}_{d/2}}^d \ \mathsf{G \ A \ C \ A}
$$

이전 단계에서 앞부터 d/2개의 문자를 기준으로 정렬되어 있는 상태입니다. 앞 쪽의 연속한 $d$개의 문자의 순서는 이미 계산되어 있습니다. 게다가 뒷 쪽의 연속한 $d$개의 문자는 $i+d$번째 접미사의 순서와 같다는 것을 알 수 있습니다.

$$
\begin{array}{|c|c|}

\hline

\mathsf{i} & \mathsf{i'th \ suffix} \\

\hline

\begin{array}{c}
i \\
i+d
\end{array}

&

\begin{array}{r}
\mathsf{\underline{G \ A} \ \underline{\color{red}{T \ A}} \ G \ A \ C \ A} \\
\mathsf{\underline{\color{red}{T \ A}} \ G \ A \ C \ A} 
\end{array}

\\

\hline

\end{array}
$$

따라서 $i$번째 접미사의 앞부터 $2d$개의 문자는 **($i$번째 접미사 순서, $i+d$번째 접미사 순서)** 쌍으로 나타낼 수 있습니다. 다른 $j$번째 접미사와 비교하려면 ($j$번째 접미사 순서, $j+d$번째 접미사 순서) 쌍과 비교하여 두 접미사간 대소를 $O(1)$에 판단할 수 있습니다.

### 예시

문자열 $s=\mathsf{ABAAB}$의 접미사 배열을 구해봅시다.

**첫 번째 단계**에서는 첫 글자를 기준으로 정렬합니다. 각 접미사의 순서를 $\mathsf{rank}$에 저장했습니다.

$$
\begin{array}{|c|c|c|}

\hline

\mathsf{sa[i]} & \mathsf{suffix \ array} & \mathsf{rank[sa[i]]} \\

\hline

\begin{array}{c}
\mathsf{0} \\
\mathsf{2} \\
\mathsf{3} \\
\mathsf{1} \\
\mathsf{4}
\end{array}

&

\begin{array}{l}
\mathsf{\color{red}{A} \color{black}{BAAB}} \\
\mathsf{\color{red}{A} \color{black}{AB}} \\
\mathsf{\color{red}{A} \color{black}{B}} \\
\mathsf{\color{red}{B} \color{black}{AAB}} \\
\mathsf{\color{red}{B}}
\end{array}

&

\begin{array}{c}
\mathsf{1} \\
\mathsf{1} \\
\mathsf{1} \\
\mathsf{2} \\
\mathsf{2}
\end{array}

\\

\hline

\end{array}
$$

**두 번째 단계**에서는 앞부터 두 글자를 기준으로 정렬해야 합니다. ($i$번째 접미사 순서, $i+d$번째 접미사 순서) 쌍을 적습니다. 이 때, 빈 문자열인 경우 $\mathsf{0}$번째로 취급합니다.

$$
\begin{array}{|c|c|c|}

\hline

\mathsf{sa[i]} & \mathsf{suffix \ array} & \mathsf{pair}\\

\hline

\begin{array}{c}
\mathsf{0} \\
\mathsf{2} \\
\mathsf{3} \\
\mathsf{1} \\
\mathsf{4}
\end{array}

&

\begin{array}{l}
\mathsf{\color{red}{AB} \color{black}{AAB}} \\
\mathsf{\color{red}{AA} \color{black}{B}} \\
\mathsf{\color{red}{AB}} \\
\mathsf{\color{red}{BA} \color{black}{AB}} \\
\mathsf{\color{red}{B}}
\end{array}

&

\begin{array}{c}
\mathsf{(1,2)} \\
\mathsf{(1,1)} \\
\mathsf{(1,2)} \\
\mathsf{(2,1)} \\
\mathsf{(2,0)}
\end{array}

\\

\hline

\end{array}
$$

접미사를 순서쌍 기준으로 정렬하여 새롭게 순서를 메기면 이 단계가 끝나게 됩니다.

$$
\begin{array}{|c|c|c|}

\hline

\mathsf{sa[i]} & \mathsf{suffix \ array} & \mathsf{rank[i]} \\

\hline

\begin{array}{c}
\mathsf{2} \\
\mathsf{0} \\
\mathsf{3} \\
\mathsf{4} \\
\mathsf{1}
\end{array}

&

\begin{array}{l}
\mathsf{\color{red}{AA} \color{black}{B}} \\
\mathsf{\color{red}{AB} \color{black}{AAB}} \\
\mathsf{\color{red}{AB}} \\
\mathsf{\color{red}{B}} \\
\mathsf{\color{red}{BA} \color{black}{AB}}
\end{array}

&

\begin{array}{ccc}
\mathsf{(1,1)} & \Rightarrow & \mathsf{1} \\
\mathsf{(1,2)} & \Rightarrow & \mathsf{2} \\
\mathsf{(1,2)} & \Rightarrow & \mathsf{2} \\
\mathsf{(2,0)} & \Rightarrow & \mathsf{3} \\
\mathsf{(2,1)} & \Rightarrow & \mathsf{4}
\end{array}

\\

\hline

\end{array}
$$

**세 번째 단계**에서는 앞부터 네 글자를 기준으로 정렬합니다. 마찬가지로 순서쌍을 적습니다. 

$$
\begin{array}{|c|c|c|}

\hline

\mathsf{sa[i]} & \mathsf{suffix \ array} & \mathsf{pair}\\

\hline

\begin{array}{c}
\mathsf{2} \\
\mathsf{0} \\
\mathsf{3} \\
\mathsf{4} \\
\mathsf{1}
\end{array}

&

\begin{array}{l}
\mathsf{\color{red}{AAB}} \\
\mathsf{\color{red}{ABAA} \color{black}{B}} \\
\mathsf{\color{red}{AB}} \\
\mathsf{\color{red}{B}} \\
\mathsf{\color{red}{BAAB}}
\end{array}

&

\begin{array}{c}
\mathsf{(1,3)} \\
\mathsf{(2,1)} \\
\mathsf{(2,0)} \\
\mathsf{(3,0)} \\
\mathsf{(4,2)}
\end{array}

\\

\hline

\end{array}
$$

접미사를 순서쌍 기준으로 정렬하여 새롭게 순서를 메겨줍니다.

$$
\begin{array}{|c|c|c|}

\hline

\mathsf{sa[i]} & \mathsf{suffix \ array} & \mathsf{rank[i]} \\

\hline

\begin{array}{c}
\mathsf{2} \\
\mathsf{3} \\
\mathsf{0} \\
\mathsf{4} \\
\mathsf{1}
\end{array}

&

\begin{array}{l}
\mathsf{\color{red}{AAB}} \\
\mathsf{\color{red}{AB}} \\
\mathsf{\color{red}{ABAA} \color{black}B} \\
\mathsf{\color{red}{B}} \\
\mathsf{\color{red}{BAAB}}
\end{array}

&

\begin{array}{ccc}
\mathsf{(1,3)} & \Rightarrow & \mathsf{1} \\
\mathsf{(2,0)} & \Rightarrow & \mathsf{2} \\
\mathsf{(2,1)} & \Rightarrow & \mathsf{3} \\
\mathsf{(3,0)} & \Rightarrow & \mathsf{4} \\
\mathsf{(4,2)} & \Rightarrow & \mathsf{5}
\end{array}

\\

\hline

\end{array}
$$

**네 번째 단계**에서는 앞부터 네 글자를 기준으로 정렬합니다. 마찬가지로 순서쌍을 적습니다.

$$
\begin{array}{|c|c|c|}
\hline
\mathsf{sa[i]} & \mathsf{suffix \ array} & \mathsf{pair} \\
\hline
\begin{array}{c}
\mathsf{2} \\
\mathsf{0} \\
\mathsf{3} \\
\mathsf{4} \\
\mathsf{1}
\end{array}
&
\begin{array}{l}
\mathsf{\color{RED}{AAB}} \\
\mathsf{\color{RED}{ABAAB}} \\
\mathsf{\color{RED}{AB}} \\
\mathsf{\color{RED}{B}} \\
\mathsf{\color{RED}{BAAB}}
\end{array}
&
\begin{array}{c}
\mathsf{(1,0)} \\
\mathsf{(2,4)} \\
\mathsf{(3,0)} \\
\mathsf{(4,0)} \\
\mathsf{(5,0)}
\end{array}
\\
\hline
\end{array}
$$

접미사를 순서 쌍 기준으로 정렬하여 새롭게 순서를 메겨줍니다.

$$
\begin{array}{|c|c|c|}
\hline
\mathsf{sa[i]} & \mathsf{suffix \ array} & \mathsf{rank[i]} \\
\hline
\begin{array}{c}
\mathsf{2} \\
\mathsf{3} \\
\mathsf{0} \\
\mathsf{4} \\
\mathsf{1}
\end{array}
&
\begin{array}{l}
\mathsf{\color{red}{AAB}} \\
\mathsf{\color{red}{AB}} \\
\mathsf{\color{red}{ABAAB}} \\
\mathsf{\color{red}{B}} \\
\mathsf{\color{red}{BAAB}}
\end{array}
&
\begin{array}{ccc}
\mathsf{(1,0)} & \Rightarrow & \mathsf{1} \\
\mathsf{(2,4)} & \Rightarrow & \mathsf{2} \\
\mathsf{(3,0)} & \Rightarrow & \mathsf{3} \\
\mathsf{(4,0)} & \Rightarrow & \mathsf{4} \\
\mathsf{(5,0)} & \Rightarrow & \mathsf{5}
\end{array}
\\
\hline
\end{array}
$$

모든 글자를 기준으로 정렬하고 났을 때, 접미사 배열 $\mathsf{sa = [2,3,0,4,1]}$가 완성됩니다.

### $O(n \log^2 n)$ 구현

총 $\lceil \log n \rceil$단계에 대해서, 각 단계마다 `std::sort()`를 이용하여 $O(n \log n)$에 정렬하는 방법으로 구현했습니다.

```cpp
vector<int> buildsa(string &s){
    int n = s.size();
    vector<int> sa(n), r(n+1), nr(n+1);
    for(int i=0;i<n;++i) sa[i]=i, r[i]=s[i];
    for(int d=1;d<n;d<<=1){
        auto cmp = [&](int i,int j){
            return r[i]<r[j] || (r[i]==r[j] && r[i+d]<r[j+d]); };
        sort(sa.begin(), sa.end(), cmp);

        nr[sa[0]] = 1;
        for(int i=1;i<n;++i)
            nr[sa[i]] = nr[sa[i-1]] + cmp(sa[i-1], sa[i]);
        r = nr;
    }
    return sa;
}
```

첫 단계에서 한 글자로 기준으로 정렬하는 경우, 대문자 혹은 소문자로만 이뤄져 있다고 가정하고 아스키값으로 $\mathsf{rank}$를 지정했습니다. 이는 대소 비교를 위한 값이라 실제 값은 중요하지 않기 때문입니다.

### $O(n \log n)$ 구현

위의 구현에서 정렬하는 부분을 **counting sort**로 $O(n)$에 해결하는 방법입니다. pair를 counting sort하는 방법만 알면 동일하게 구현할 수 있습니다. 두 번째 원소를 기준으로 정렬한 뒤, 첫 번째 원소를 기준으로 stable sort함으로써 pair를 정렬할 수 있습니다.

#### stable counting sort

counting sort할 때 쓰이는 `count` 배열의 누적하면, `count[x]`는 원소 `x`가 있을 수 있는 마지막 위치를 나타내게 됩니다. 따라서 다음과 같이 마지막 원소부터 위치를 순서대로 저장할 수 있습니다. `idx[i]`는 stable sort했을 때 `i`번째로 오는 원소의 인덱스를 저장하게 됩니다.

```cpp
vector<int> countingsort(vector<int> &a){
    int n = a.size(), m = 1000; // m : a원소가 될 수 있는 최대값
    vector<int> cnt(m), idx(n);
    for(int i=0;i<n;++i) cnt[a[i]]++;
    for(int i=1;i<m;++i) cnt[i] += cnt[i-1];
    for(int i=n-1;~i;--i) idx[--cnt[a[i]]] = i;
    return idx;
}
```

 이를 이용한 pair를 counting sort하는 구현은 다음과 같습니다.

```cpp
vector<int> countingsort(vector<pii> &a){
    int n = a.size(), m = 1000;
    vector<int> cnt(m), idx(n);
    for(int i=0;i<n;++i) cnt[a[i].second]++;
    for(int i=1;i<m;++i) cnt[i] += cnt[i-1];
    for(int i=n-1;~i;--i) idx[--cnt[a[i].second]] = i;

    vector<int> ret(n);
    for(int i=0;i<m;++i) cnt[i] = 0;
    for(int i=0;i<n;++i) cnt[a[i].first]++;
    for(int i=1;i<m;++i) cnt[i] += cnt[i-1];
    for(int i=n-1;~i;--i) ret[--cnt[a[idx[i]].first]] = idx[i]; 
    return ret;
}
```

최종적으로 `(r[i], r[i+d])`에 대한 counting sort를 구현하면, 접미사 배열을 $O(n \log n)$에 구할 수 있습니다.

```cpp
vector<int> buildsa(string &s){
    int n = s.size(), m = max(256,n)+1;
    vector<int> sa(n), r(n+n), nr(n+n), cnt(m), idx(n);
    for(int i=0;i<n;++i) sa[i]=i, r[i]=s[i];
    for(int d=1;d<n;d<<=1){
        auto cmp = [&](int i,int j){
            return r[i]<r[j] || (r[i]==r[j] && r[i+d]<r[j+d]); };

        for(int i=0;i<m;++i) cnt[i] = 0;
        for(int i=0;i<n;++i) cnt[r[i+d]]++;
        for(int i=1;i<m;++i) cnt[i] += cnt[i-1];
        for(int i=n-1;~i;--i) idx[--cnt[r[i+d]]] = i;

        for(int i=0;i<m;++i) cnt[i] = 0;
        for(int i=0;i<n;++i) cnt[r[i]]++;
        for(int i=1;i<m;++i) cnt[i]+=cnt[i-1];
        for(int i=n-1;~i;--i) sa[--cnt[r[idx[i]]]] = idx[i];

        nr[sa[0]] = 1;
        for(int i=1;i<n;++i) nr[sa[i]] = nr[sa[i-1]] + cmp(sa[i-1], sa[i]);
        for(int i=0;i<n;++i) r[i] = nr[i];

        if(r[sa[n-1]]==n) break; // reduce running time
    }
    return sa;
}
```

## Longest Common Prefix 배열

LCP(Longest Common Prefix) 배열이란, 접미사 배열 상에서 이웃한 두 접미사 간의 최장 공통 접두사의 길이를 저장한 배열입니다. 여기에서는 각 접미사에 대해 사전 순으로 바로 앞에 있는 접미사와 비교하도록 하겠습니다.. 예를 들어, 문자열 $s=\mathsf{ASDSDASD}$에 대한 LCP 배열은 다음과 같습니다.

$$
\begin{array}{|c|c|c|c|}

\hline

\mathsf{i} & \mathsf{sa[i]} & \mathsf{suffix \ array} & \mathsf{lcp[i]} \\

\hline

\begin{array}{c}
\mathsf{0} \\
\mathsf{1} \\
\mathsf{2} \\
\mathsf{3} \\
\mathsf{4} \\
\mathsf{5} \\
\mathsf{6} \\
\mathsf{7} 
\end{array}

&

\begin{array}{c}
\mathsf{5} \\
\mathsf{0} \\
\mathsf{7} \\
\mathsf{4} \\
\mathsf{2} \\
\mathsf{6} \\
\mathsf{3} \\
\mathsf{1} 
\end{array}

&

\begin{array}{l}
\mathsf{ASD} \\
\mathsf{ASDSDASD} \\
\mathsf{D} \\
\mathsf{DASD} \\
\mathsf{DSDASD} \\
\mathsf{SD} \\
\mathsf{SDASD} \\
\mathsf{SDSDASD} 
\end{array}

&

\begin{array}{c}
\mathsf{-} \\
\mathsf{3} \\
\mathsf{0} \\
\mathsf{1} \\
\mathsf{1} \\
\mathsf{0} \\
\mathsf{2} \\
\mathsf{2} 
\end{array}

\\

\hline

\end{array}
$$

접미사 배열을 순회하면서 나이브하게 구하는 경우 시간복잡도는 $O(n^2)$가 됩니다. 접미사의 길이가 긴 순서로 LCP 길이를 구하는 경우, 이미 구한 LCP 길이를 이용해서 $O(n)$만에 구할 수 있습니다.

$i$번째 접미사의 LCP 길이를 구했다고 가정합시다.

$$
\begin{array}{|c|c|c|}

\hline

\mathsf{sa[i]} & \mathsf{suffix \ array} & \mathsf{lcp[i]} \\

\hline

\begin{array}{c}
\mathsf{-} \\
i
\end{array}

&

\begin{array}{l}
\mathsf{\color{red}{ASD}} \\
\mathsf{\color{red}{ASD} \color{black}{SDASD}}
\end{array}

&

\begin{array}{c}
\mathsf{-} \\
\mathsf{3}
\end{array}

\\

\hline

\end{array}
$$

$i$번째 접미사의 첫 글자를 지우면 $i+1$번째 접미사가 되고 LCP의 길이는 최소 $\mathsf{2(=3-1)}$인 것을 알 수 있습니다. 둘 사이에 있는 접미사에 따라 $\mathsf{2}$ 이상이 될 수도 있으므로 LCP 길이를 갱신해주도록 합시다.

$$
\begin{array}{|c|c|c|}

\hline

\mathsf{sa[i]} & \mathsf{suffix \ array} & \mathsf{lcp[i]} \\

\hline

\begin{array}{c}
\mathsf{-} \\
\\
\mathsf{-} \\
i+1
\end{array}

&

\begin{array}{l}
\mathsf{\color{red}{SD}} \\
\cdots \\
\mathsf{\color{red}{SD} \color{black}{ASD}} \\
\mathsf{\color{red}{SD} \color{black}{SDASD}}
\end{array}

&

\begin{array}{c}
\mathsf{-} \\
\\
\mathsf{-} \\
\mathsf{2}
\end{array}

\\

\hline

\end{array}
$$

이런 방식으로 모든 접미사에 대해 길이 순으로 LCP 길이를 구하면 됩니다. 각 접미사마다 이전 접미사의 LCP 길이를 $k$라고 할 때 $k$는 최대 $n$번 증가하고 최대 $n$번 감소하기 때문에 $O(n)$만에 LCP 배열을 만들 수 있는 것 입니다.

위의 내용을 구현하려면 사전 순으로 바로 앞에 있는 접미사의 인덱스를 알아야 하기 때문에 `isa[i]` 배열을 정의하겠습니다.

* `sa[i]` : 사전 순으로 `i`번째가 몇 번째 접미사인지 저장합니다.

* `isa[i]` : `sa[i]`의 반대 배열. `i`번째 접미사가 사전 순으로 몇 번째 인지 저장합니다. 즉, `isa[sa[i]] = i`를 만족합니다.

이렇게 하면 사전 순으로 바로 앞에 있는 접미사를 `sa[isa[i]-1]`로 구할 수 있게 됩니다.

다음은 LCP 배열을 구하는 코드입니다.

```cpp
vector<int> buildlcp(vector<int> &sa, const string &s){
    int n = s.size();
    vector<int> lcp(n), isa(n);
    for(int i=0;i<n;++i) isa[sa[i]] = i;
    for(int k=0, i=0;i<n;++i) if(isa[i]){
        for(int j=sa[isa[i]-1]; s[i+k]==s[j+k]; ++k);
        lcp[isa[i]] = (k ? k-- : 0);
    }
    return lcp;
}
```
