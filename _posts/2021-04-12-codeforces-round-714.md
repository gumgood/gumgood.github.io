---
layout: post
title: "Codeforces Round 714 (Div.2)"
description: "A~E번까지 업솔빙"
tags: [editorial]
---

### A. Array and Peaks

길이 n의 수열 a에 대해 a[i-1] < a[i] && a[i] > a[i+1]를 만족하는 i를 피크라고 하자. 정확히 k개의 피크를 가지는 수열을 출력하는 문제다.

1, n, 2, n-1, 3, n-2, ..와 같이 홀수 인덱스는 1부터 증가하는 순서로, 짝수 인덱스는 n부터 감소하는 순서로 배열한다. k번째 피크가 나오면 해당 부분부터 감소 순으로 정렬했다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        int n, k;
        scanf("%d%d",&n,&k);
        if((n-1)/2 < k) puts("-1");
        else{
            deque<int> dq(n); iota(all(dq),1);
            vector<int> ans;
            for(int i=0;i<n;++i){
                if(i%2==0) ans.push_back(dq.front()), dq.pop_front();
                else ans.push_back(dq.back()), dq.pop_back();
            }
            int s = 1;
            if(k){
                for(;s+1<n;++s)
                    if(ans[s-1]<ans[s] && ans[s]>ans[s+1])
                        if(--k==0) break;
            }else{
                s = 0;
            }
            sort(ans.begin() + s, ans.end(), greater<int>());
            for(auto it : ans)
                printf("%d ",it); puts("");
        }
    }
}
```

### B. AND Sequences

길이 n의 수열 a이 주어진다. 모든 i에 대해 (a[1] & ... & a[i]) = (a[i+1] & ... & a[n])을 만족하도록 a를 섞는 방법의 수를 출력하는 문제다.

양 끝에 올 수 있는 수는 (a[1] & ... & a[n]) = x 뿐이다. 수열 a에 x가 총 m번 등장한다고 하자. 그 중 두 개를 고르고 나머지를 자유롭게 섞으면 된다. 따라서 방법의 수는 mC2 \* (n-2)!이다. 

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;
const lint mod = 1e9 + 7;

int n, a[200000];

lint solve(){
    int x = a[0];
    for(int i=1;i<n;++i) x &= a[i];

    int cnt = 0;
    for(int i=0;i<n;++i)
        if(a[i] == x) cnt++;

    lint ret = (lint)cnt*(cnt-1)%mod;
    for(int i=1;i<=n-2;++i)
        ret = ret * i % mod;
    return ret;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d",&n);
        for(int i=0;i<n;++i)
            scanf("%d",a+i);

        lint ans = solve();
        printf("%lld\n",ans);
    }
}
```

### C. Add One

정수 n의 각 digit d에 대해 d+1로 대체하는 연산을 할 수 있다. 연산을 m번 수행했을 때, 몇 개의 digit이 되는지 구하는 문제다.

각 digit 0 ~ 9에 대해 operation을 0 ~ m번 적용했을 때, 몇 개의 digit이 되는지 dp로 전처리 해두면 각 testcase에 대해 O(1)에 해결할 수 있다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;
const lint mod = 1e9 + 7;

int n, m;

lint mul[200001][10];

void solve(){
    for(int x=0;x<10;++x){
        vector<lint> cnt(10), tmp(10);
        cnt[x] = 1;
        for(int i=0;i<200001;++i){
            mul[i][x] = accumulate(all(cnt),0ll) % mod;

            for(int j=0;j<9;++j)
                tmp[j+1] = cnt[j];
            tmp[0] = cnt[9];
            tmp[1] = (tmp[1] + cnt[9]) % mod;
            cnt = tmp;
        }
    }
}

int main(){
    solve();

    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d",&n,&m);

        vector<int> cnt(10);
        for(;n;n/=10) cnt[n%10]++;

        lint ans = 0;
        for(int i=0;i<10;++i)
            ans = (ans + mul[m][i] * cnt[i]) % mod;
       printf("%lld\n",ans);    
    }
}
```

### D. GCD and MST

길이 n의 수열 a와 정수 p가 주어진다. 다음과 같은 규칙으로 무방향 그래프가 구성된다.

* gcd(a[i], a[i+1], ..., a[j]) = min(a[i], a[i+1], ..., a[j])이면 i와 j 사이에 가중치가 min(a[i], a[i+1], ..., a[j])인 간선이 존재한다.

* i와 i+1 사이에 가중치가 p인 간선이 존재한다. (두 정점 사이 여러 간선이 있을 수 있다)

이때 minimum spanning tree의 가중치를 구하는 문제다.

min(a[i], a[i+1], ..., a[j]) = a[k]면, i부터 j사이 정점들을 모두 가중치 min(p, a[k])로 이을 수 있다. 이런식으로 연속한 i들로 이뤄진 컴포넌트들이 만들어지고, 컴포넌트들 끼리는 가중치가 p인 간선들로 이어지게 된다. 각 컴포넌트들은 최소 가중치의 간선으로 이뤄져 있으니 컴포넌트 내 정점들은 min(p, a[k])로 연결하고, 컴포넌트들 끼리는 p로 연결하면 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, p, a[200000];

lint solve(){
    priority_queue<pair<int,int>> pq;
    for(int i=0;i<n;++i)
        pq.emplace(-a[i], i);

    vector<bool> v(n);
    vector<int> c(n,p);
    while(!pq.empty()){
        int x = pq.top().second; pq.pop();
        if(v[x]) continue;

        for(int s=x; 0<s && a[s-1]%a[x]==0; --s){
            v[s] = true;
            c[s-1] = min(c[s-1], a[x]);
            if(v[s-1]) break;    
        }
        for(int e=x; e<n-1 && a[e+1]%a[x]==0; ++e){
            v[e] = true;
            c[e] = min(c[e], a[x]);
            if(v[e+1]) break;
        }
    }

    lint ret = 0;
    for(int i=0;i<n-1;++i)
        ret += c[i];
    return ret;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d",&n,&p);
        for(int i=0;i<n;++i)
            scanf("%d",a+i);

        lint ans = solve();
        printf("%lld\n",ans);
    }
}
```

### E. Cost Equilibrium

길이 n의 수열 a에 대해 다음과 같은 연산을 여러 번 수행할 수 있다.

1. 인덱스 i와 j를 고른다. i를 source, j를 sink라 하자. a[i]에서 x(<=a[i])만큼 빼서 a[j]에 x를 더한다.

2. 한 번 sink가 된 곳은 source가 될 수 없고, 한 번 source가 된 곳은 sink가 될 수 없다.

3. 이 때, 총 x \* |j-i|의 비용이 든다.

수열 a를 섞을 때, 모든 원소를 동일하게 만드는 비용의 최대값과 최소값이 같아지는 경우의 수를 구하는 문제다. B번과는 다르게 섞인 위치가 달라도 배열이 같으면 같은 것으로 본다.

우선 cut = (a[1] + ... + a[n]) / n이라 하면, 다음과 같은 관측을 할 수 있다.

* cut이 정수가 아니면 답은 존재하지 않는다.

* cut보다 큰 a[i]는 반드시 source가 되어야 하고, cut보다 작은 a[i]는 반드시 sink가 되어야 한다. 

* source에서 sink로 화살표를 그렸을 때, 서로 다른 방향의 화살표가 교차하면 총 비용의 최대값과 최소값이 달라진다.

이로부터 sink와 source가 좌우 분리되는 경우만 답이 된다는 사실을 알 수 있다. 단, a[i] = cut이면 화살표가 생기지 않기 때문에 어느 곳에 위치하든 상관없다.

a[i]=cut인 원소가 eq개 있다면, 답은 (sink를 나열하는 방법의 수) \* (source를 나열하는 방법의 수) \* 2 \* (n개의 위치 중 eq개를 골라 a[i]=cut을 배치하는 방법의 수)가 된다.

sink와 source를 나열하는 방법의 수는 (나열할 개수)!인데 중복원소가 있을 수 있으니 중복원소마다 (중복원소 개수)! 나눠줘야한다. 단, sink-source 순서와, source-sink 순서가 가능하므로 2를 곱해준다. 마지막으로 n개 중 eq개를 고르는 방법의 수는 nCeq이다.

예외가 하나 있는데, source 또는 sink가 하나 있는 경우 어디에 있든 반대 방향의 화살표는 교차하지 않는다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;
const lint mod = 1e9 + 7;

int n, a[100000];

lint pw(lint x,lint p){
    lint ret = 1;
    for(;p;p>>=1, x=x*x%mod)
        if(p&1) ret = ret*x%mod;
    return ret;
}

lint fac(lint x){
    lint ret = 1;
    for(lint i=2;i<=x;++i)
        ret = ret * i % mod;
    return ret;
}

lint inv(lint x){
    return pw(x,mod-2);
}

lint combi(lint n,lint r){
    lint ret = fac(n);
    ret = ret * inv(fac(n-r)) % mod;
    ret = ret * inv(fac(r)) % mod;
    return ret;
}

lint solve(){
    lint sum = accumulate(a,a+n,0ll);
    if(sum%n) return 0;

    lint cut = sum / n;
    lint up = 0, dw = 0, eq = 0;
    map<int,int> ovup, ovdw;
    for(int i=0;i<n;++i){
        if(a[i] > cut) up++, ovup[a[i]]++;
        if(a[i] < cut) dw++, ovdw[a[i]]++;
        if(a[i]== cut) eq++;
    }

    if(up==1){
        lint ret = 1;
        ret = ret * fac(dw + eq) % mod;
        ret = ret * inv(fac(eq)) % mod;
        for(auto [k, v] : ovdw)
            if(v>1) ret = ret * inv(fac(v)) % mod;
        ret = ret * (dw + eq + 1) % mod;
        return ret;
    }
    if(dw==1){
        lint ret = 1;
        ret = ret * fac(up + eq) % mod;
        ret = ret * inv(fac(eq)) % mod;
        for(auto [k, v] : ovup)
            if(v>1) ret = ret * inv(fac(v)) % mod;
        ret = ret * (up + eq + 1) % mod;
        return ret;
    }
    if(up==0 && dw==0){
        return 1;
    }

    lint ret = 1;
    ret = ret * fac(up) % mod;
    for(auto [k, v] : ovup)
        if(v>1) ret = ret * inv(fac(v)) % mod;
    ret = ret * fac(dw) % mod;
    for(auto [k, v] : ovdw)
        if(v>1) ret = ret * inv(fac(v)) % mod;
    ret = ret * combi(n,eq) % mod;
    ret = ret * 2 % mod;
    return ret;
}

int main(){
    int tc = 1;
    while(tc--){
        scanf("%d",&n);
        for(int i=0;i<n;++i)
            scanf("%d",a+i);

        printf("%lld\n",solve());
    }
}
```

modular 공간에서 pow, factorial, multiplicative inversion, combination을 O(logn)에 구현했는데, 다음과 같이 전처리하는 코드도 있었다.

```cpp
#define MAX 100005

vector<int> f(MAX);
vector<int> inv(MAX);

void init() {
    f[0] = 1;
    for(int i=1;i<MAX;i++) f[i] = (f[i-1]*i)%MOD;
    inv[MAX-1] = power(f[MAX-1], MOD-2, MOD);
    for(int i=MAX-2;i>=0;i--) inv[i] = (inv[i+1]*(i+1)) % MOD;

    for(int i=0;i<MAX;i++) assert(inv[i]==power(f[i],MOD-2,MOD));
}
```

O(logn)이 익숙하지만 O(1)까지 줄여야한다면 이런 방법도 나쁘지 않겠다.

### F. Swapping Problem

다음에 풀어보도록 하자.
