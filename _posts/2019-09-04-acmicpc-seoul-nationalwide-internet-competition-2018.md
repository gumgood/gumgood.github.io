---
title: "ACM-ICPC Seoul Nationalwide Internet Competition 2018"
categories: [problem_solving, editorial]
tags: [icpc]
---

<https://www.acmicpc.net/category/detail/1935>

## A. BOJ 16282 Black Chain

첫 번째 접근법은 'n개의 고리가 연결된 체인에서 m개의 고리를 풀 때 1g부터 ng까지 모든 무게를 생성할 수 있는지' 여부를 판단하는 함수 f를 만들어 풀어야 할 고리의 최소값을 binary search로 찾는 것이었습니다.

f를 만들어낸 방법은 다음과 같습니다. m개의 고리를 풀면 1g 고리가 m개가 생성되므로 일단 이것만으로 1g부터 mg까지 모두 생성이 가능합니다. 남은 (n-m)g의 체인은 m+1개 이하의 체인들로 나눌 수 있습니다. 여기서 나눈 체인들은 앞에서 푼 고리 사이에 들어간다고 생각하시면 됩니다. 1g ~ mg의 무게를 만들 수 있을 때, (m+1)g의 체인이 추가되면 1g ~ 2m+1까지의 무게를 만들 수 있습니다. 체인이 남는다면 2m+2를 더 추가하는 식으로 만들 수 있는 무게의 상한을 늘려나갈 수 있습니다. 남은 체인이 늘리려는 무게 (m+1)g보다 모자라다면 n개의 고리를 모두 쓴 것이므로 남은 체인만큼만 갱신하면 됩니다. 이렇게 구한 무게가 ng이라면 m개의 고리를 풀었을 때 1g부터 ng까지 모든 무게를 만들 수 있습니다. 

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

ll n;

bool f(ll m){
  ll res = n - m, can = m, piece = m+1;
  while(piece--){
    if(res >= can+1){
      res -= can+1;
      can += can+1;
    }else{
      can += res;
      res = 0;
      break;
    }
  }
  return can == n;
}

int main(){
  scanf("%lld",&n);

  ll s = 1, e = n;
  while(s<e){
    ll m = (s+e)/2;
    if(f(m))
      e = m;
    else
      s = m+1;
  }
  printf("%lld",s);
}
```

체인을 추가할 때 길이는 m+1, 2m+2, 4m+4, ..., 2^m*(m+1)의 크기가 추가되면서 만들 수 있는 최대 무게를 갱신합니다. 함수 f(m)은 O(logn)이고 이때 m의 최소값을 binary search로 O(logn)에 찾으므로 전체 O(log^2 n)에 찾았습니다.

### 다른 풀이

두 번째 접근법은 수식으로 계산하는 것입니다. 첫 번째 접근법에서 아이디어를 얻었습니다. m개의 고리를 풀 때, 만들 수 있는 무게의 최대값은 1g으로 만들 수 있는 mg과 추가되는 체인들인 (m+1)(1 + 2 + 4 + ... + 2^m)g으로 만들 수 있는데 이를 정리하면 다음과 같습니다.

$$
m + (m+1) \cdot (2^m - 1)
$$

m개의 고리를 끊었을 때 만들 수 있는 값이 n보다 크거나 같다면, n까지의 수는 모두 만들 수 있습니다. n보다 작다면 당연히 ng을 만들 수 없습니다. 따라서 위의 값을 n보다 크거나 같게 만드는 m값을 단순 검색할 수 있습니다.

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

ll n;

int main(){
  scanf("%lld", &n);

  ll m = 0;
  while(m + (m+1) * ((1LL<<(m+1))-1) < n)
    m++;

  printf("%lld", m);
}
```

이 값은 n까지 2^m보다 큰 폭으로 증가합니다. 전체 시간복잡도는 O(logn)입니다.

## B. BOJ 16283 Farm

양을 x마리, 염소를 y마리라 하면 다음과 같은 일차 연립방정식을 세울 수 있습니다.

$$
\begin{cases} n=x+y \\ w=ax+by \end{cases}
$$

n, w, a, b가 주어지므로 해의 개수(0, 1, 무수히 많음)와 그 해를 수학적으로 구할 수 있습니다. 몇 가지 예외 처리로 O(1)에 구할 수 있습니다.

반면에 n이 1000이하이므로 x, y도 1000이하입니다. 저는 간단한 구현으로 O(n)에 풀었습니다.

```cpp
#include<bits/stdc++.h>
using namespace std;


int a, b, n, w;

void solve(){
  int ans = 0, shp;
  for(int i=1;i<n;++i)
    if(a*(i)+b*(n-i)==w)
      ans++, shp = i;

  if(ans==1)
    printf("%d %d",shp,n-shp);
  else
    printf("-1");
}

int main(){
  scanf("%d%d%d%d",&a,&b,&n,&w);

  solve();
}
```

## F. BOJ 16287 Parcel

A의 원소 중 '합이 정확히 w가 되는 4개의 원소가 있는지'를 확인하는 문제이다. 다음 배열의 정의를 보자.

> $\mathrm{cnt}(s, e, idx) := $ ($a[i]+a[j]=idx$)를 만족하는 $i$, $j$ 순서상의 수 $i < j \in [s,e]$

cnt(s, e)[idx] := a[i] + a[j] = idx를 만족하는 i, j 순서쌍의 수 i < j ∈[s, e]

위 배열은 $O(n^2)$의 전처리를 통해 만들 수 있으며 a[s] ~ a[e] 사이 원소 중 '합이 정확히 w가 되는 2개의 원소가 있는지'를 $O(1)$에 확인할 수 있다. 이 문제를 푸는 기본적인 아이디어는 두 원소를 묶어서 생각하는 것이다. 두 개의 원소 a[i], a[j]를 정했을 때, 나머지 두 원소의 합이 w-a[i]-a[j]가 되는지만 확인하면 된다.

각 원소를 인덱스 순서대로 fir < sec < thd < fou라 하자. sec이 정해지면, fir은 [0, sec) 중 하나가 될 수 있고, thd와 fou는 (sec, n-1] 중 두 개일 것이다. 어떤 sec가 있을 때 모든 fir에 대해 w-a[fir]-a[sec]를 이루는 a[thd]+a[fou]가 있는지 확인하면 된다. 이를 식을 나타내면 다음과 같다.

> $\mathrm{cnt}(sec,\,n-1,\,w-a[fir]-a[sec]) > 0$

어떤 무게를 이루는 2개의 원소가 있는지는 $O(1)$에 확인 가능하고 모든 fir에 대해 확인해야 하므로 $O(n)$이 걸린다. 이를 모든 sec에 대해 반복하면 $O(n^2)$이다.

단, sec에 대해 cnt(sec, n-1)배열을 확인한 후에는 sec+1에 대해 확인를 하기 위해 cnt(sec+1, n-1)배열을 써야 함에 유의해야 한다. 이는 cnt(s, e) 배열로부터 cnt(s+1, e) 배열을 구하는 문제로 연결되는데, a[s]와 합을 이루는 모든 값 a[s] + a[i] (i = s+1 ~ e)을 배열에서 지워주면 되므로 $O(n)$에 다음 배열인 cnt(s+1, e)를 구할 수 있다. 

```cpp
#include<bits/stdc++.h>
using namespace std;

int w, n, a[5000];
int cnt[800001];

bool solve(){
  for(int i=1;i<n;++i)
    for(int j=i+1;j<n;++j)
      cnt[a[i]+a[j]]++;

  for(int sec=1; sec<n-2; ++sec){
    for(int thd=sec+1; thd<n; ++thd)
      cnt[a[sec]+a[thd]]--;

    for(int fir=0; fir<sec; ++fir){
      int res = w - a[fir] - a[sec];
      if(res>=0 && cnt[res]) return true;
    }
  }
  return false;
}

int main(){
  scanf("%d%d",&w,&n);
  for(int i=0;i<n;++i)
    scanf("%d",a+i);

  bool ans = solve();
  puts(ans ? "YES" : "NO");
}
```

정리하자면, 전처리에 $O(n^2)$. $O(n)$개의 sec에 대해 '모든 fir에 대한 검사'와 'cnt배열 계산'을 한다. '모든 fir에 대한 검사'는 $O(n)$개의 fir에 대해 $O(1)$에 검사하므로 $O(n)$, 'cnt배열 계산'은 도 앞서 설명했듯이 $O(n)$이므로 총 $O(n^2)$이다. 따라서 전체 시간복잡도는 $O(n^2)$.

## G. BOJ 16288 Passport Control

각 심사 창구는 queue이고 입국 대기 줄이 오름차순이므로 '각 심사대는 승객을 오름차순으로만 내보낼 수 있습니다'. 이를 이용해 그리디하게 해결할 수 있습니다. 첫 번째 심사대에 보낼 수 있는 최대한의 승객을 보내주었다고 가정합시다. 이는 입국 대기 줄에서 LIS일 것입니다. 그럼 나머지 2~K개의 심사대에 대해 N-len(LIS(N))명의 승객을 보내는 문제가 됩니다. 여기서 부문문제의 형태를 띄고 있음을 알 수 있습니다. 마지막 경우인 심사대가 하나인 경우, 들어온 순서(오름차순)대로 나갈 수 밖에 없습니다.

```cpp
#include<bits/stdc++.h>
using namespace std;

int n, k, pi[100];

bool v[100];

bool solve(){
  while(k--){
    int s = 0;
    for(int i=0;i<n;++i)
      if(!v[i] && s < pi[i])
        v[i]=true, s = pi[i];
  }

  for(int i=0;i<n;++i)
    if(!v[i]) return false;
  return true;
}

int main(){
  scanf("%d%d",&n,&k);
  for(int i=0;i<n;++i)
    scanf("%d",pi+i);

  bool ans = solve();
  puts(ans ? "YES" : "NO");
}
```

O(k)개의 각 심사대에 대해 남은 수열 중 LIS를 찾는데 O(n)가 걸려서 전체 O(kn)에 풀 수 있습니다.
