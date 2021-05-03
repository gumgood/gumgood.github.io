---
layout: post
title: "Codeforces Round 711 (Div.2) 개인 풀이"
description: "대회 참가 후기 및 개인 풀이"
tags: [editorial]
---

### A. GCD Sum

gcdSum(x)는 x 자리수의 합과 x의 gcd로 정의된다. 어떤 n이 주어지면, x>=n이고 gcdSum(x)>1인 가장 작은 x를 출력하는 문제다.

n부터 시작해서 조건을 만족할 때까지 완전 탐색했다.

editorial의 증명을 참고하자면, x가 3의 배수일 때 x 자리수의 합 역시 3의 배수이므로 gcdSum(x)>1이 항상 성립한다. 따라서 어느 수에서 시작하든 최대 세 개의 숫자만 확인하게 된다.

**proof by ac**해버렸다. A번이라는 점도 있었지만 system test가 있는 대회이므로 반드시 고쳐야겠다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

lint digit(lint x){
    lint ret = 0;
    for(;x;x/=10) ret += x%10;
    return ret;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        lint n; scanf("%lld",&n);        
        while(gcd(n,digit(n))==1) n++;
        printf("%lld\n",n);
    }
}
```

### B. Box Fitting

높이는 1, 너비는 2^k꼴인 사각형이 n개 주어진다. 이 사각형들을 너비가 w인 상자 안에 담으려고 한다. 이 때, 상자 높이의 최소 값을 구하는 문제다.

너비가 큰 사각형이 들어갈 공간이라면 그 안은 작은 사각형들로 채울 수 있다. 따라서 사각형을 큰 순서대로 빈 공간에 채워 놓고 공간이 부족하면 상자의 높이를 1식 늘려줬다.

대회 중에는 증명을 대충하고 넘어갔는데 editorial을 참고해서 정당성을 확인했다. 일단 상자에 사각형을 넣는 방법은 여러가지가 있을 수 있다. 어떤 최적해에 대해 사각형 둘을 큰 사각형 하나와 위치를 바꿀 수 있기 때문에 큰 상자부터 쌓은 형태로 재배열할 수 있다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, W;
int w[100000];

int solve(){
    int ret = 0;
    priority_queue<int> pq;
    sort(w,w+n,greater<int>());
    for(int i=0;i<n;++i){
        if(pq.empty() || pq.top() < w[i])
            pq.emplace(W), ret++;
        int res = pq.top(); pq.pop();
        pq.emplace(res - w[i]);
    }
    return ret;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d",&n,&W);
        for(int i=0;i<n;++i)
            scanf("%d",w+i);
        printf("%d\n",solve());
    }
}
```

### C. Planar Refections

n개의 평면이 연속하게 서있고,  왼쪽에서 오른쪽으로 decay age가 k인 입자를 쏜다. 입자가 직선을 통과하는 순간 통과한 반대 방향으로 진행하는 decay age가 k-1인 입자를 복사된다. 단, k=1이면 복사되지 않는다. 입자를 쏘고 모든 과정이 끝난 뒤 총 몇 개의 입자가 생기는지 세는 문제다.

decay age 별로 입자가 몇 개가 생기는지 따로 셌다. 어떤 입자의 decay age가 1보다 크다면 진행방향의 평면 개수 만큼 입자가 복사된다. 각 입자가 복사되는 위치에 해당하는 count 배열을 만들어 누적했뒀다가 다음 decay age에 대해 처리할 때 스위핑하면서 구했다.

정말 어렵게 써놓은 지문이라 처음엔 잘못 이해해서 시간을 날렸다. 제대로 이해한 후에 dp로 접근했으나 O(n^2k) 풀이만 생각나서 포기했다. 장고 끝에 위의 풀이를 세웠지만 양 끝에 탈출한 입자를 처리하는 과정에서 인덱스 관리를 못했다. 

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;
const lint mod = 1e9 + 7;

int n, k;

lint a[1001][1001];

lint solve(){
    for(int i=0;i<k;++i)
        for(int j=0;j<n;++j)
            a[i][j] = 0;
    for(int i=1;i<k;++i){
        if(i==1){
            for(int j=0;j<n;++j)
                a[i][j] = 1;
        }else{
        if(i&1){
                for(int j=n-2;~j;--j)
                       a[i][j] = (a[i-1][j+1] + a[i][j+1]) % mod;    
            }else{
                for(int j=1;j<n;++j)
                    a[i][j] = (a[i-1][j-1] + a[i][j-1]) % mod;
            }
        }
    }
    lint ret = 1;
    for(int i=0;i<k;++i)
        for(int j=0;j<n;++j)
            ret = (ret + a[i][j]) % mod;
    return ret;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d",&n,&k);
        printf("%lld\n",solve());
    }
}
```

### D. Bananas in a Microwave

초기값 $k$에 대해 n번의 time step동안 쿼리를 수행한다. 각 time step마다 $k:=\lceil (k + x_i) \rceil$ 또는 $k:=\lceil (k \cdot x_i) \rceil$의 연산이 주어지는데 0번에서 최대 $y_i$번 실행할 수 있다. $k$를 1, 2, ..., m으로 만들 수 있는 최소 time step을 각각 출력하는 문제다.

1, 2, ..., m을 만들 수 있는 최소 time step을 저장하는 배열을 채워나가는 식으로 풀 수 있다. 각 time step마다 각 $k$에 대해 $y_i$번 연산을 해보고 배열을 채우면 된다. 하지만 이런 식으로 단순하게 구현하면 O(nm^2)으로 시간초과를 받는다.

시간복잡도를 줄이는 방법은 editorial을 참고했다. $y_i$번 연산하는 과정에서 배열이 이미 채워져 있으면 더 이상 진행할 필요가 없다. 나중에 그 배열에서 시작해서 또 $y_i$번의 연산을 시작할 것이기 때문에 중복된다. 따라서 이런 부분을 커팅해주면 배열의 한 원소를 최대 두 번 방문하므로 한 time step당 O(m)이 걸린다. 따라서 전체 O(nm)에 해결할 수 있다.

제대로 접근했으나 **문제를 틀리게 이해해서 못 풀었다**. 각 time step마다 연산을 최대 $y_i$번 수행하는 부분을 $k:=\lceil (k + y_i \times x_i) \rceil$으로 착각했다. 일정한 간격으로 늘어나지 않는다고 생각해버리니 계속 막힐 수 밖에 없었다. 또 이렇게 **중복 방문을 커팅해서 시간복잡도를 줄이는 테크닉**은 linear sieve of eratosthenes로 알고 있었지만 문제로 나오니 풀지 못했다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, m;
lint t[201], x[201], y[201];

int dp[100001];
bool v[201][100001];

void solve(){
  memset(dp, -1, sizeof(dp));
  v[0][0] = true;
  for(int i=1;i<=n;++i)
    for(int j=0;j<=m;++j)
      if(v[i-1][j]){
        lint k = j;
        v[i][j] = true;
        for(int l=0;l<y[i];++l){
          if(t[i]==1)
            k = k + (x[i] + 100000 - 1) / 100000;
          else
            k = (k * x[i] + 100000 - 1) / 100000;

          if(k > m || v[i-1][k]) break;
          v[i][k] = true; dp[k] = i;
        }
      }
  for(int i=1;i<=m;++i)
    printf("%d ",dp[i]);
}

int main(){
  scanf("%d%d",&n,&m);
  for(int i=1;i<=n;++i)
    scanf("%lld%lld%lld",t+i,x+i,y+i);

  solve();
}
```

### E. Two Houses

다음에 풀어보도록 하자.

### F. Christmas Game

이것도 풀어보도록 하자.
