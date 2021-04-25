---
layout: post
title: "Codeforces Round 717 (Div.2)"
description: "A~D번까지 업솔빙"
tags: [editorial]
---

### A. Tit for Tat

길이가 n인 수열이 주어진다. 두 원소를 골라서 한쪽에서 1을 빼서 다른 쪽에 1을 더하는 연산을 최대 k번 수행할 수 있다. 이때 만들 수 있는 사전적으로 가장 앞선 수열을 출력하는 문제다.

앞에서부터 가능한 많이 빼서 맨 뒤에 더해준다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, k, a[100];

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d",&n,&k);
        for(int i=0;i<n;++i)
            scanf("%d",a+i);

        int sub = 0;
        for(int i=0;i<n;++i)
            while(a[i] && sub<k)
                a[i]--, sub++;
        a[n-1] += sub;

        for(int i=0;i<n;++i)
            printf("%d ",a[i]); puts("");
    }
}
```

### B. AGAGA XOOORRR

길이가 n인 수열이 주어진다. 인접한 두 원소를 골라 제거한 뒤 그 위치에 bitwise XOR한 값을 넣는 연산을 할 수 있다. 이러한 연산을 통해서 모든 원소를 같게 만들 수 있는지 구하는 문제다.

수열을 [a, ..., a]로 만들 수 있다면 세 개의 a를 XOR하여 a로 만들 수 있다. 따라서 모든 원소가 같도록 만들 수 있다면 [a, a] 또는 [a, a, a]로 만들 수 있다. 두 경우만 확인해주면 된다. prefix-XOR을 이용하여 적절히 구현했다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, a[2000];
int px[2000];

bool solve(){
    px[0] = a[0];
    for(int i=1;i<n;++i)
        px[i] = px[i-1] ^ a[i];

    int x = 0;
    for(int i=n-1;i;--i){
        x ^= a[i];
        if(px[i-1]==x) return true;
        if(px[i-1]==0)
            for(int j=0;j<i;++j)
                if(px[j]==x) return true;
    }
    return false;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d",&n);
        for(int i=0;i<n;++i)
            scanf("%d",a+i);

        puts(solve() ? "YES" : "NO");
    }
}
```

### C. Baby Ehab Partitions Again

길이가 n인 수열이 주어진다. 몇 개의 원소를 제거하여 수열의 합이 같은 두 부분수열로 나눌 수 없도록 하려고 한다. 이 때 제거할 최소 개수의 원소를 출력하는 문제다.

두 부분수열로 나눌 수 있는 방법이 없다면 원소를 제거하지 않아도 된다. 나눌 수 있다면 홀수 하나만 제거하면 된다. 만약 모든 수가 짝수라면, 홀수가 나올 때까지 모든 수를 2로 나누면 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, a[100];

bool dp[100001];

int solve(){
    int sum = accumulate(a,a+n,0);
    if(sum&1) return -1;

    dp[0] = true;
    for(int i=0;i<n;++i)
        for(int j=100001;j>=a[i];--j)
            dp[j] |= dp[j-a[i]];

    if(!dp[sum/2]) return -1;

    int mx=INF, ret=0;
    for(int i=0;i<n;++i)
        if(mx > (a[i] & -a[i]))
            mx = (a[i] & -a[i]), ret = i+1; 
    return ret;
}

int main(){
    scanf("%d",&n);
    for(int i=0;i<n;++i)
        scanf("%d",a+i);

    int ans = solve();
    if(~ans) printf("1 %d",ans);
    else printf("0");
}
```

### D. Cut

길이가 n이 주어진다. 각 쿼리마다 l, r이 주어지면 [l,r]구간의 원소들을 몇 개의 subsequence로 분할할 수 있다. 단, 모든 subsequece에 대해 원소들의 곱과 LCM이 같도록 분할한다. 이때 분할해야하는 최소 subsequence 개수를 출력하는 문제다.

i번째 수부터 최대 몇 번째 수까지 subsequence로 만들 수 있는지 안다면, l에서 시작해서 r번째 수를 커버할 때까지 Greedy하게 최대한 많은 원소를 포함해나가면 된다. 이 과정은 쿼리 당 O(n)이 필요하지만 sparse table을 이용하여 O(log n)으로 줄일 수 있다. i번째 수에서 2^j개의 subsequence로 최대 몇 번째 수까지 커버할 수 있는지 전처리해두면 된다.

i번째 수에서 최대 몇 번째 수까지 subsequence로 만들 수 있는지는 two-pointer로 해결할 수 있다. [s,e]의 모든 원소가 서로소라면 [s-1,e]도 모든 원소가 서로소이기 때문이다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, q, l, r;
int a[100001];

int p[100001];
int st[100001][20][2];

void init(){
    int e = -1, x;
    for(int s=0;s<n;++s){
        for(;e+1<n;++e){
            bool chk = false;
            x = a[e+1];
            for(int d=2;d*d<=x;++d)
                for(;x%d==0;x/=d)
                    if(p[d]) chk = true;
            if(x>1) if(p[x]) chk = true;

            if(chk) break;

            x = a[e+1];
            for(int d=2;d*d<=x;++d)
                for(;x%d==0;x/=d)
                    p[d]++;
            if(x>1) p[x]++;
        }

        st[s][1][0] = e;
        st[s][1][1] = 1;

        x = a[s];
        for(int d=2;d*d<=x;++d)
            for(;x%d==0;x/=d)
                p[d]--;
        if(x>1) p[x]--;
    }

    for(int p=2;p<20;++p)
        for(int i=0;i<n;++i){
            int end = st[i][p-1][0];
            if(end+1 < n){
                st[i][p][0] = st[end+1][p-1][0];
                st[i][p][1] = st[end+1][p-1][1] + st[i][p-1][1];
            }else{
                st[i][p][0] = n-1;
                st[i][p][1] = st[i][p-1][1];
            }
        }
}


int qry(int l, int r){
    int ret = 0;
    for(int i=19;i;--i)
        if(l<n && st[l][i][0] < r){
            ret += st[l][i][1];
            l = st[l][i][0]+1;
        }
    return ret+1;
}

int main(){
    scanf("%d%d",&n,&q);
    for(int i=0;i<n;++i)
        scanf("%d",a+i);

    init();

    for(int i=0;i<q;++i){
        scanf("%d%d",&l,&r);
        printf("%d\n",qry(l-1,r-1));
    }
}
```

### E. Baby Ehab Plays with Permutations

다음에 풀어보도록 하자.
