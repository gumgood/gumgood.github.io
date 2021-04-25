---
layout: post
title: "Codeforces Round 718 (Div.1 + Div.2)"
description: "A~E번까지 업솔빙"
tags: [editorial]
---

### A. Sum of 2050

2050, 20500, 205000, ... 와 같이 2050 \* 10^k꼴의 수를 2050-수라고 하자. 수 n이 주어졌을 때 2050-수들의 합으로 나타낼 수 있는지, 나타낼 수 있다면 최소 몇 개가 필요한지 출력하는 문제다.

가능한 가장 큰 2050-수부터 써서 n을 만들어보면 된다.

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
        lint n; scanf("%lld",&n);

        int ans = 0;
        for(lint i = 1e15; i; i/=10)
            while(n >= i*2050)
                n -= i*2050, ans++;
        if(n) ans = -1;

        printf("%d\n",ans);
    }
}
```

### B. Morning Jogging

m명의 달리기 주자들이 0, 1, ..., n으로 번호가 매겨진 n+1개의 체크포인트를 순서대로 지난다. i번째와 i+1번째 사이에는 m개의 길이 있고 j번째 길의 길이는 b[i][j]이다. 어떤 주자가 n개의 길을 선택하여 지나가면, 그 중 가장 작은 b[i][j]만큼 피로를 느낀다. 주자들이 서로 겹치지 않게 길을 선택할 때, 모든 선수들의 피로의 합을 최소로 만드는 문제다.

각 주자에게 전체 경로를 하나식 배정해주자. 남은 길 중에 b[i][j]가 가장 작은 길을 고르면 이값이 주자의 피로도가 되고, 남은 n-1개의 구간에 대해서는 아무 길이나 고르면 된다. 따라서 남은 구간은 최대한 b[i][j]가 큰 길을 골라주어 다른 주자들이 작은 b[i][j]를 고를 수 있도록 한다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, m;
int b[100][100];

int ans[100][100];

void solve(){
    deque<int> a[100];
    for(int i=0;i<n;++i){
        a[i] = deque<int>(b[i],b[i]+m);
        sort(all(a[i]));
    }

    for(int x=0;x<m;++x){
        int mn = 0;
        for(int i=1;i<n;++i)
            if(a[mn].front() > a[i].front())
                mn = i;
        for(int i=0;i<n;++i){
            if(mn==i){
                ans[i][x] = a[i].front();
                a[i].pop_front();
            }else{
                ans[i][x] = a[i].back();
                a[i].pop_back();
            }
        }
    }

    for(int i=0;i<n;++i,puts(""))
        for(int j=0;j<m;++j)
            printf("%d ",ans[i][j]);
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d",&n,&m);
        for(int i=0;i<n;++i)
            for(int j=0;j<m;++j)
                scanf("%d",&b[i][j]);
        solve();
    }
}
```

### C. Fillomino 2

n x n 칸의 격자가 있고 n개의 대각원소에 순열 p가 적혀져 있다. 대각원소 아래의 삼각형 영역에 규칙에 맞게 숫자를 채우는 문제다. 두 격자가 인접하면서 같은 수를 가진다면 서로 이동 할 수 있다. 각 격자의 값과 갈 수 있는 격자의 수가 같아지도록 숫자를 채워야 한다.

p1, p2, ..., pn 순서로 가능한 가장 왼쪽으로 붙여서 채우면 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, p[500];

int ans[500][500];

void solve(){
    for(int x=0;x<n;++x){
        int i=x, j=x;
        for(int k=0;k<p[x];++k){
            ans[i][j] = p[x];
            if(j==0 || ans[i][j-1]) i++;
            else j--;
        }
    }
    for(int i=0;i<n;++i,puts(""))
        for(int j=0;j<=i;++j)
            printf("%d ",ans[i][j]);
}
int main(){
    scanf("%d",&n);
    for(int i=0;i<n;++i)
        scanf("%d",p+i);

    solve();
}
```

### D. Explorer Space

n x m 격자가 있고 인접한 격자로 이동하는데 드는 비용이 주어진다. 모든 (i,j)칸에 대해 각 칸에서 시작하여 정확히 k번 이동한 뒤 다시 (i,j)로 돌아오는 최소 비용을 출력하는 문제다.

격자는 이분 그래프이므로 k가 홀수면 돌아갈 수 없으므로 k가 짝수인 경우만 생각하자. k번의 이동 중 처음 k/2번의 비용을 C1, 나머지 k/2번의 비용을 C2라고 하자. C1 + C2가 최소 비용이라면 C1 = C2이다(C1 > C2라면 C2를 왕복하는 경우 비용이 더 작아저 모순이다). 따라서 처음 k/2번의 이동 후 왔던 길을 되돌아가도 최소 비용이 된다. 이 점을 이용하여 Dynamic Programming으로 해결할 수 있다.

DP[k][i][j] = ((i,j)칸에서 시작해서 k번 이동 후 돌아오는 최소 비용)으로 정의하면, (인접한 칸으로 이동하는 비용) + (인접한 칸에서 시작해서 k-2번 이동 후 돌아오는 최소 비용) + (인접한 칸에서 돌아오는 비용)으로 갱신할 수 있다.

가로 범위가 m인데 n으로 **범위를 잘못 검사**해서 한 번 틀렸다. 가로 세로 길이가 다른 격자 문제에서 범위를 꼼꼼히 확인하지 않고 있다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, m, k;

int r[500][500];
int d[500][500];

int dp[21][500][500];

void solve(){
    for(int kk=2;kk<=k;kk+=2)
        for(int i=0;i<n;++i)
            for(int j=0;j<m;++j){
                dp[kk][i][j] = INF;
                if(i>0) dp[kk][i][j] = min(dp[kk][i][j], dp[kk-2][i-1][j] + d[i-1][j]*2);
                if(j>0) dp[kk][i][j] = min(dp[kk][i][j], dp[kk-2][i][j-1] + r[i][j-1]*2);
                if(i<n-1) dp[kk][i][j] = min(dp[kk][i][j], dp[kk-2][i+1][j] + d[i][j]*2);
                if(j<m-1) dp[kk][i][j] = min(dp[kk][i][j], dp[kk-2][i][j+1] + r[i][j]*2);
            }

    for(int i=0;i<n;++i,puts(""))
        for(int j=0;j<m;++j){
            if(k%2)
                printf("-1 ");
            else
                printf("%d ",dp[k][i][j]);
        }
}

int main(){
    scanf("%d%d%d",&n,&m,&k);
    for(int i=0;i<n;++i)
        for(int j=0;j<m-1;++j)
            scanf("%d",&r[i][j]);
    for(int i=0;i<n-1;++i)
        for(int j=0;j<m;++j)
            scanf("%d",&d[i][j]);

    solve();
}
```

### E. Group Photo

길이 n의 수열 a가 주어진다. 각 원소는 C 또는 P 집합 중 하나에 속해야 하는데, C 원소의 간격은 점점 멀어지거나 같아야하고, P 원소의 간격은 점점 가까워지거나 같아야 한다. 이 때, C 원소의 합보다 P원소의 합이 커지는 경우가 몇 가지 인지 구하는 문제다.

각 원소가 속한 집합을 `C`, `P`로 나타낸다고 했을 때 직접 해보면 생각보다 간단하다. `PP`, `CC`, `PC`, `CP`로 시작했을 때 뒤에 올 수 있는 패턴은 정해진다. `PP...P CC...C` 또는 `(C/P) CC...C PCPC...PC PP...P (C/P)`이다. 첫 번째 패턴은 Prefix sum으로 세고 두 번째 패턴은 Two pointers, Divide and conquer, Binary search와 같은 방법들로 세주면 된다.

나는 두 번째 패턴을 Binary search로 해결했다. 양 끝 원소를 제외하고 `CC...C PP...P`의 패턴을 만든 뒤 `PP...P`가 `PCPC...PC`로 어디까지 대체될 수 있는지 찾는 것으로 접근했다. 간단한 인덱스의 홀짝에 따른 누적합 배열을 따로 만들어 Binary search하면 된다.

대회 중에 두 번째 패턴은 빠르게 찾았는데 첫 번째 패턴은 생각하지 못 했다. 게다가 **lower_bound를 쓰면 유독 구현이 지체**되는 경향이 있다. 양끝 값과 찾으려는 값, 길이가 1인 경우 등 고려해야할 게 많다보니 꼬이는 것 같다. 또 케이스가 나뉘는 경우 비슷하더라도 따로 코드를 짜는게 빠르고 확실한데, **일반화시킨 뒤 합쳐서 짜려는 습관** 때문에 시간이 지체되고 실수도 많아지고 있다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;
const int MOD = 998244353;

int n, a[200000];

int solve(){
    int ret = 0;

    // pp...p cc...c
    lint psum = 0, sum = accumulate(a,a+n,0ll);
    for(int i=0;i<n;++i){
        psum += a[i];
        if(psum > sum - psum)
            ret++;
    }

    // cc...c pcpc...pc pp...p
    //      i         ^ (lower bonud)
    auto f = [&](vector<int> a,lint base){
        vector<lint> pa, ev, od;
        for(int i=0;i<size(a);++i) pa.push_back(a[i]);
        for(int i=0;i<size(a)-1;i+=2) ev.push_back(a[i]);
        for(int i=1;i<size(a)-1;i+=2) od.push_back(a[i]);
        for(int i=1;i<size(pa);++i) pa[i] += pa[i-1];
        for(int i=1;i<size(ev);++i) ev[i] += ev[i-1];
        for(int i=1;i<size(od);++i) od[i] += od[i-1];
        for(int i=0;i<size(a)-1;++i){
            vector<lint> &oe = (i&1 ? od : ev);
            lint dff = base + pa[size(a)-1] - pa[i] - pa[i];
            int cnt = lower_bound(all(oe), oe[i/2] + (dff+1)/2) - lower_bound(all(oe), oe[i/2]);
            if(dff > 0) ret = (ret + cnt) % MOD;
        }
    };

    // Case1: cc...c pcpc...pc pp...p
    if(1 < n) f(vector<int>(a,a+n), 0);
    // Case2: cc...c pcpc...pc pp...p(c)
    if(2 < n) f(vector<int>(a,a+n-1), -a[n-1]);
    // Case3: (p)ccc...c pcpc...pc pp...p
    if(2 < n) f(vector<int>(a+1,a+n), a[0]);
    // Case4: (p)ccc...c pcpc...pc pp...p(c)
    if(3 < n) f(vector<int>(a+1,a+n-1), a[0]-a[n-1]);

    return ret;

}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d",&n);
        for(int i=0;i<n;++i)
            scanf("%d",a+i);
        printf("%d\n",solve());
    }
}
```
