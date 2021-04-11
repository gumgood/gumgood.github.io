---
layout: post
title: "Codeforces Round 713 (Div.3)"
description: "A~G번까지 업솔빙"
tags: [editorial]
---

### A. Spy Detected!

n개의 수가 주어지는데 하나의 수를 제외하고 모두 같은 값이다. 이 때, 혼자 다른 값을 가지는 수의 위치를 출력하는 문제다.

처음에 수의 위치가 아닌 수를 출력하는 것으로 **문제를 착각했다**. 그 값은 정렬하면 맨 앞 또는 뒤에 오게 됨을 이용하여 코드를 작성하다가 착각했음을 깨달았다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, a[102];

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d",&n);
        for(int i=1;i<=n;++i)
            scanf("%d",a+i);

        int ans = 0;
        a[0] = a[n];
        a[n+1] = a[1];
        for(int i=1;i<=n;++i)
            if(a[i-1] == a[i+1] && a[i-1] != a[i])
                ans = i;
        printf("%d\n",ans);
    }
}
```

### B. Almost Rectangle

n x n 필드에 `*`이 두 개 찍혀있다. 이 두 점을 꼭짓점으로 하고 각 변이 축에 평행하는 사각형이 되도록 `*` 두 개를 더 찍어서 출력하는 문제다.

대각선으로 있으면 사각형은 유일하므로 해당 위치에 찍는다. 대각선이 아니면 같은 축 위에 존재하는 것이므로 한 칸 옆으로 옮겨서 동일하게 찍는다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n;
char s[400][401];

void solve(){
    int sx=-1, sy, ex, ey;
    for(int i=0;i<n;++i)
        for(int j=0;j<n;++j)
            if(s[i][j]=='*' && sx == -1)
                sx = i, sy = j, s[i][j] = '.';
    for(int i=0;i<n;++i)
        for(int j=0;j<n;++j)
            if(s[i][j]=='*')
                ex = i, ey = j, s[i][j] = '.';
    if(sx == ex){
        s[sx][sy] = '*';
        s[e][ey] = '*';
        s[(sx+1)%n][sy] = '*';
        s[(ex+1)%n][ey] = '*';
    }
    else if(sy == ey){
        s[sx][sy] = '*';
        s[ex][ey] = '*';
        s[sx][(sy+1)%n] = '*';
        s[ex][(ey+1)%n] = '*';
    }
    else{
        s[sx][sy] = '*';
        s[ex][ey] = '*';
        s[sx][ey] = '*';
        s[ex][sy] = '*';
    }
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d",&n);
        for(int i=0;i<n;++i)
            scanf("%s",s[i]);

        solve();
        for(int i=0;i<n;++i)
            printf("%s\n",s[i]);
    }
}
```

### C. A-B Palindrome

`0` 또는 `1` 또는 `?`으로 이뤄진 문자열이 주어진다. `?`이 있는 위치에 `0`또는 `1`을 넣을 수 있다. 이 때, 팰린드롬이면서 a개의 `0`과 b개의 `1`로 이뤄진 binary string으로 만드는 문제다.

대칭되는 두 원소가 모두 `0` 또는 `1`로 fixed 된 경우, 팰린드롬이 성립하지 않으면 답이 존재하지 않는다. 둘 중 하나만 fixed된 경우, 그에 맞게 채운다. 남은 `?`는 대칭을 유지하면서 자유롭게 채우면 된다. 채우는 과정에서 `0`, `1`이 a, b보다 많아지면 답이 존재하지 않는다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int a, b;
char s[200001];

bool solve(){
    int n = a + b;
    for(int i=0;i<n;++i){
        if(s[i]!='?' && s[n-1-i]!='?' && s[i]!=s[n-1-i])
            return false;
        if(s[i]=='0') a--;
        if(s[i]=='1') b--;
    }
    for(int i=0;i<n;++i)
        if(s[i]=='?' && s[n-1-i] != '?'){
            if(s[n-1-i] == '0'){
                if(a==0) return false;
                s[i] = '0'; a--;
            }else{
                if(b==0) return false;
                s[i] = '1'; b--;
            }
        }
    for(int i=0;i<n/2;++i)
        if(s[i]=='?'){
            if(a>=2) s[i] = s[n-1-i] = '0', a-=2;
            else if(b>=2) s[i] = s[n-1-i] = '1', b-=2;
            else return false;
        }
    if(n%2 && s[n/2]=='?'){
        if(a>0) s[n/2] = '0', a--;
        else if(b>0) s[n/2] = '1', b--;
        else return false;
    }
    return a==0 && b==0;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d%s",&a,&b,s);
        if(!solve()) puts("-1");
        else puts(s);
    }
}
```

### D. Corrupted Array

n개의 수로 이뤄진 수열 a가 있다. 수열 a에 "음이 아닌 정수 x"와 "수열 a의 합"을 추가한 뒤, 순서를 섞은 수열을 b라고 하자. b가 주어졌을 때, 이를 만족하는 a를 출력하는 문제다.

두 가지 경우가 있을 수 있다.

* "x"가 "수열 a의 합"보다 크거나 같은 경우이다. 두 번째로 큰 수가 "수열 a의 합"이 되므로 이 값이  (가장 작은 n개의 수의 합)과 같은지 확인하면 된다.

* "x"가 "수열 a의 합"보다 작은 경우이다. 가장 큰 수가 "수열 a의 합"이므로 이 값이 (가장 작은 n+1개의 수의 합) - b[i]가 되는 b[i]가 있는지 확인하면 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n;
lint b[200002];

lint psum[200002];

bool solve(){
    sort(b,b+n+2);

    psum[0] = b[0];
    for(int i=1;i<n+2;++i)
        psum[i] = psum[i-1] + b[i];

    // case 1: a1, ..., an, sum, x
    if(psum[n-1] == b[n]){
        forint i=0;i<n;++i)
            printf("%lld ",b[i]); puts("");
        return true;
    }

    // case 2: a1, ..., x, ..., sum
    int idx = -1;
    for(int i=0;i<n+1;++i)
        if(psum[n] - b[i] == b[n+1])
            idx = i;
    if(~idx){
        for(int i=0;i<idx;++i)
            printf("%lld ",b[i]);
        for(int i=idx+1;i<n+1;++i)
            printf("%lld ",b[i]); puts("");
        return true;
    }

    return false;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d",&n);
        for(int i=0;i<n+2;++i)
            scanf("%lld",b+i);
        if(!solve()) puts("-1");
    }
}
```

### E. Permutation by Sum

n, l, r, s가 주어지면, 길이가 n인 순열 중 p[l] + p[l+1] + ... + p[r] = s를 만족하는 순열을 출력하는 문제다.

* 가능한 s의 최솟값은 [l,r]에 1, 2, ..., r-l+1을 채울 때이다. x = r-l+1라고 하면, x(x+1)/2로 나타낼 수 있다.

* 가능한 s의 최댓값은 [l,r]에 n, n-1, ..., n-r+l을 채울 때이다. x = r-l+1라고 하면, (n+1)x - x(x+1)/2로 나타낼 수 있다.

s가 이 사이 값을 만족하면, [l,r]에 1, 2, ..., m을 먼저 채우고 합이 s가 될 때까지 맨 뒤부터 가능한 최대값까지 늘린다. 그 후, 남은 수들로 [1,l-1], [r+1,n] 구간을 채운다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, l, r, s;

int a[555];

bool solve(){
    int x = (r - l + 1);
    if(s < x*(x+1)/ 2) return false;
    if(s > (n+1)*x - x*(x+1)/2) return false;

    s -= x*(x+1)/2;
    for(int i=l;i<=r;++i)
        a[i] = i - l + 1;
    for(int i=r;i>=l;--i){
        int diff = min(n - x, s);
        a[i] += diff, s -= diff;
    }

    vector<bool> v(n+1);
    for(int i=l;i<=r;++i)
        v[a[i]] = true;
    queue<int> q;
    for(int i=1;i<=n;++i)
        if(!v[i]) q.emplace(i);

    for(int i=1;i<l;++i)
        a[i] = q.front(), q.pop();
    for(int i=r+1;i<=n;++i)
        a[i] = q.front(), q.pop();

    for(int i=1;i<=n;++i)
        printf("%d ",a[i]); puts("");

    return true;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d%d%d",&n,&l,&r,&s);
        if(!solve()) puts("-1");
    }
}
```

### F. Education

n개의 직무가 있다. i번 직무에서 일하는 경우, 하루에 a[i]원을 벌 수 있다. 이 때, b[i]원을 지불하면 i+1번 직무로 넘어갈 수 있다. 맨 처음 0원을 가지고 1번 직무에서 일하기 시작할 때, c원을 벌기 위한 최소 일 수를 출력하는 문제다.

m일 안에 c원을 벌 수 있다면 m+1일 안에 c원을 벌 수 있고, m일 안에 c원을 벌 수 없다면 m-1일 안에  c원을 벌 수 없다. 따라서 m에 대해 parametric search를 하기 위해, m일 안에 c원을 벌 수 있는가에 대한 결정 문제를 해결해야 한다.

a[i]는 증가한다는 보장이 있기 때문에 i번 직무에서 마지막으로 일했다면, 해당 직무에 가장 빠르게 도달해서 일하는게 최적이다. 모든 i번 직무에 대해 도달하는 최소 일수와 도달했을 때 남은 돈을 전처리한다면, 각 직무에서 마지막으로 일할 때 m일간 벌 수 있는 돈의 최대값을 계산할 수 있다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n;
lint c, a[200000], b[200000];

lint day[200000];
lint res[200000];

bool f(int m){
    res[0] = day[0] = 0;
    for(int i=1;i<n;++i){
        if(res[i-1] >= b[i-1]){
            day[i] = day[i-1] + 1;
            res[i] = res[i-1] - b[i-1];
        }else{
            int need = (b[i-1] - res[i-1] + a[i-1] - 1) / a[i-1];
            day[i] = day[i-1] + need + 1;
            res[i] = res[i-1] + a[i-1]*need - b[i-1];
        }
    }

    lint mx = a[0] * m;
    for(int i=1;i<n;++i)
        if(m >= day[i])
            mx = max(mx, res[i] + a[i] * (m - day[i]));
    return mx >= c;
}

int solve(){
    int s = 1, e = 1e9;
    while(s<e){
        int m = (s+e)>>1;
        if(!f(m)) s = m+1;
        else e = m;
    }
    return s;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d",&n,&c);
        for(int i=0;i<n;++i)
            scanf("%lld",a+i);
        for(int i=0;i<n-1;++i)
            scanf("%lld",b+i);
        printf("%d\n",solve());
    }
}
```

### G. Short Task

d(n) = (n의 모든 약수의 합)이다. c가 주어지면 d(n) = c를 만족하는 최소 n을 구하는 문제다.

d(n)을 eratosthenes sieve와 유사하게 O(nloglogn)에 전처리 하면 모든 테스트 케이스를 상수시간에 처리할 수 있다.

소수 p에 대해 d(p^e) = (p^(e+1)-1)/(p-1)이 성립한다. 각 소수에 대해 소수 간격으로 배열을 방문하는데, 소수가 몇 번 곱해졌는지 cnt배열에 p^e 형태로 관리하면 d(n)을 채워나갈 수 있다.

totient function과 헷갈려서 시간을 날렸다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

lint p[10000002], cnt[10000002];
int ans[10000002];

void solve(){
    lint n = 10000002;
    fill(p,p+n,1);
    for(lint i=2;i<n;++i) if(p[i]==1){
        cnt[i] = (i*i);
        p[i] *= (cnt[i]-1) / (i-1);
        for(lint times=2;times*i<n;times++){
            cnt[times*i] = (times%i==0 ? cnt[times]*i : i*i);
            p[times*i] *= (cnt[times*i]-1) / (i-1);
        }
    }
    fill(ans,ans+n,-1);
    for(int i=1;i<n;++i)
        if(p[i]<n && ans[p[i]]==-1)
            ans[p[i]] = i;
}

int main(){
    solve();

    int tc; scanf("%d",&tc);
    while(tc--){
        int c; scanf("%d",&c);
        printf("%d\n",ans[c]);
    }
}
```

대회 중에 다음과 같이 O(nlogn)에 해결하여 1.886s에 아슬아슬하게 통과한 코드도 있었다.

```cpp
for(int i=1; i<MAX; ++i)
    for(int j=i; j<MAX; j+=i)
        s[j] += i;
```
