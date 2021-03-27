---
layout: post
title: "Codeforces Round 710 (Div.3)"
description: "A~E번까지 업솔빙"
tags: [editorial]
---

### A. Strange Table

n x m 행렬에 row major로 번호가 붙어있다. 어떤 번호 x가 주어졌을 때, x가 있는 위치에 col major로 번호가 붙었다면 어떤 번호가 있었을지 구하는 문제다.

x = n \* i + j이므로 m \* j + i를 출력하면 된다. 번호가 1부터 시작하므로 유의하면 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lin = long long;
using fint = long double;
const lint INF = 1e9 + 9;

lint n, m, x;

int main(){
    int t; scanf("%d",&t);
    while(t--){
        scanf("%lld%lld%lld",&n,&m,&x);
        x--;
        lint i = x / n;
        lint j = x % n;
        printf("%lld\n",m*j+i+1);
    }
}
```

### B. Partial Replacement

`.`과 `*`으로 이뤄진 문자열이 주어진다. 처음과 마지막으로 등장하는 `*`는 반드시 `x`로 바꿔야 한다. 남은 `*`에 대해 연속한 `x`간의 거리가 k를 넘지 않도록 `*`를 `x`로 교체해야 한다. 이 때 교체해야하는 `*`의 최소 개수를 구하는 문제다.

처음과 마지막 `*`을 먼저 바꾼다. 그런 다음 dp[i] = (i번째 문자까지 바꿨을 때 최소 교체 횟수)로 정의해서 O(N^2)에 해결했다.

Greedy로도 해결 가능하다. 각 위치에서 바꿔야 하는 가장 먼 `*`를 바꿔나가면 최소 개수가 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int n, k;
char s[51];

int dp[50];

int solve(){
    for(int i=0;i<n;++i)
        dp[i] = INF;

    in l = 0, r = n-1;
    while(l<n && s[l]=='.') l++;
    while(~r && s[r]=='.') r--;

    dp[l] = 1;
    for(int i=l+1;i<=r;++i)
        for(int j=i-k;j<i;++j)
            if(j>=l && s[j]=='*')
                dp[i] = min(dp[i], dp[j]+1);
    return dp[r];
}

int main(){
    int t; scanf("%d",&t);
    while(t--){
        scanf("%d%d%s",&n,&k,s);
        printf("%d\n",solve());
    }
}
```

### C. Double-ended Strings

두 문자열의 LCS의 길이를 구하는 문제다.

DP로 O(N^2)에 해결했다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

char a[200], b[200];

int dp[200][200];

int solve(){
    int n = strlen(a);
    int m = strlen(b);
    for(int i=0;i<n;++i)
        for(int j=0;j<m;++j)
            dp[i][j] = 0;
    for(int i=0;i<n;++i)
        if(a[i]==b[0])
            dp[i][0] = 1;
    for(int i=0;i<m;++i)
        if(a[0]==b[i])
            dp[0][i] = 1;
    for(int i=1;i<n;++i)
        for(int j=1;j<m;++j)
            if(a[i]==b[j])
                dp[i][j] = max(dp[i][j], dp[i-1][j-1] + 1);
    int ret = 0;
    for(int i=0;i<n;++i)
        for(int j=0;j<m;++j)
            ret = max(ret, dp[i][j]);
    return n + m - ret - ret;
}

int main(){
    int t; scanf("%d",&t);
    while(t--){
        scanf("%s%s",a,b);
        printf("%d\n",solve());
    }
}
```

### D. Epic Transformation

수열이 주어지면 서로 다른 값을 가지는 두 원소를 골라 수열에서 제거할 수 있다. 이 때, 만들 수 있는 수열의 최소 길이를 구하는 문제다.

가장 자주 등장한 원소를 x라고 하자. x의 등장횟수가 $\lfloor \frac{n}{2} \rfloor$이하라면 수열의 길이를 0 또는 1로 만들 수 있다. $\lfloor \frac{n}{2} \rfloor$보다 크다면 x와 x가 아닌 원소를 묶어 제거하면 x만 남게 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int n, a[200000];

int solve(){
    sort(a,a+n);
    int cnt= 1, mx = 0;
    for(int i=1;i<n;++i){
        if(a[i-1] < a[i])
           mx = max(mx, cnt), cnt = 0;
        cnt++;
    }
    mx = max(mx, cnt);
    if(mx > n/2) return mx - (n - mx);
    return n%2;
}

int main(){
    int t; scanf("%d",&t);
    while(t--){
        scanf("%d",&n);
        for(int i=0;i<n;++i)
            scanf("%d",a+i);
        printf("%d\n",solve());
    }
}
```

### E. Restoring the Permutation

어떤 수열 p의 prefix-maximum한 배열 q가 주어진다. 가능한 원래 수열 p 중 사전적으로 가장 앞선 것과 가장 마지막인 것을 출력하는 문제다.

q[i-1] < q[i]이면 반드시 p[i]=q[i]이다. i 앞의 수는 q[i]보다 작으므로 i에 반드시 q[i]가 와야하기 때문이다. 정해지지 않은 나머지 위치는 올 수 있는 수 중 가장 작은/큰 수 부터 넣어서 출력하면 된다. 

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int n, q[200000];

int mn[200000];
int mx[200000];

void solve(){
    set<int> qs(q,q+n);
    set<int> s;

    for(int i=1;i<=n;++i)
        if(qs.find(i)==qs.end())
            s.emplace(i);
    for(int i=0;i<n;++i){
        if(!i || q[i-1]<q[i]) mx[i] = q[i];
        else{
            auto it = prev(s.upper_bound(q[i]));
            mx[i] = *it;
            s.erase(it);
        }    
    }

    for(int i=1;i<=n;++i)
        if(qs.find(i)==qs.end())
            s.emplace(i);
    for(int i=0;i<n;++i){
        if(!i || q[i-1]<q[i]) mn[i] = q[i];
        else{
            mn[i] = *s.begin();
            s.erase(s.begin());
        }
    }

    for(int i=0;i<n;++i)
        printf("%d ",mn[i]); puts("");
    for(int i=0;i<n;++i)
        printf("%d ",mx[i]); puts("");
}

int main(){
    int t; scanf("%d",&t);
    while(t--){
        scanf("%d",&n);
        for(int i=0;i<n;++i)
            scanf("%d",q+i);
        solve();
    }
}
```

### F. Triangular Paths

다음에 풀어보도록 하자.

### G. Maximize the Remaining String

이것도 풀어보도록 하자.
