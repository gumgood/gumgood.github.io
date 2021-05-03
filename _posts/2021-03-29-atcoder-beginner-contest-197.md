---
layout: post
title: "Atcoder Beginner Contest 197 개인 풀이"
description: "대회 참가 후기 및 개인 풀이"
tags: [editorial]
---

### A. Rotate

길이가 3인 문자열이 주어진다. 첫 번째 문자를 마지막으로 옮기고 출력하는 문제다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int main(){
    char a,b,c;
    scanf("%c%c%c",&a,&b,&c);
    printf("%c%c%c",b,c,a);
}
```

### B. Visibility

H x W 그리드에서 `#`은 장애물, `.`은 빈 곳이다. 어떤 두 위치가 같은 행 또는 열에 있고 사이에 장애물이 없다면 서로 볼 수 있다. (X, Y)에서 볼 수 있는 곳의 개수를 세는 문제다.

장애물이 있을 때까지 스위핑했다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int h, w, x, y;
char s[101][101];

int solve(){
    int ret = 1;
    x--; y--;
    for(int k=x+1;k<h && s[k][y]=='.';++k) ret++;
    for(int k=y+1;k<w && s[x][k]=='.';++k) ret++;
    for(int k=x-1;~k && s[k][y]=='.';--k) ret++;
    for(int k=y-1;~k && s[x][k]=='.';--k) ret++;
    return ret;
}

int main(){
    scanf("%d%d%d%d",&h,&w,&x,&y);
    for(int i=0;i<h;++i)
        scanf("%s",s[i]);
    printf("%d",solve());
}
```

### C. ORXOR

수열 N을 몇 개의 구간으로 나눈 뒤 구간의 원소끼리 OR연산을 한다. 그렇게 나온 값들을 다시 XOR했을 때 나올 수 있는 최소값을 구하는 문제다.

두 원소 사이에 OR 또는 XOR 연산이 올 수 있으므로 2^(N-1)가지의 경우를 모두 검사하면 된다.

문제를 해결하기 전에 dp로 접근했다가 많이 말렸다. **B번인 만큼 쉽게 접근하자**.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, a[20];

int cal(int s,int e){
    int ret = 0;
    for(int i=s;i<=e;++i)
        ret |= a[i];
    return ret;
}

int go(int s,int v){
    if(s==n) return v;

    int ret = 1<<30;
    for(int i=s;i<n;++i)
        ret = min(ret, go(i+1,v^cal(s,i)));
    return ret;
}

int main(){
    scanf("%d",&n);
    for(int i=0;i<n;++i)
        scanf("%d",a+i);
    printf("%d",go(0,0));
}
```

### D. Opposite

2차원 평면 상에 정N각형이 있다. N개의 꼭짓점이 반시계방향 순서로 0에서 N-1까지 번호가 매겨져 있다. 0번째와 N/2번째 꼭짓점의 좌표가 주어졌을 때, 1번째 점의 좌표를 출력하는 문제다.

주어진 두 점으로부터 정N각형의 중심을 구할 수 있고, 중심을 기준으로 0번째 점을 360/N도 회전시키면 1번째 점이 된다.

**cmath**에서 지원하는 삼각함수들의 입력이 degree인지 radian인지 헷갈린다. 또 함수별로 출력이 [0, 2PI)인지, (-PI, PI]인지 정확히 모른다. 따로 메모해두자. 회전변환 행렬도 쉽게 잊으니 같이 메모해두자.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int main(){
    int n, x0, y0, x1, y1;
    scanf("%d%d%d%d%d",&n,&x0,&y0,&x1,&y1);

    double x = (double)(x0 + x1) / 2.0;
    double y = (double)(y0 + y1) / 2.0;

    double fx = (double)x0 - x;
    double fy = (double)y0 - y;

    double PI = acos(-1);
    double tx = cos(PI*2/n) * fx - sin(PI*2/n) * fy + x;
    double ty = sin(PI*2/n) * fx + cos(PI*2/n) * fy + y;

    printf("%.15lf %.15f",tx,ty);
}
```

### E. Traveler

일직선 상에 N개의 공이 있다. 각 공의 색상은 1과 N사이 숫자로 표현된다. 원점에서 시작해서 1초에 1만큼 움직이면서 공을 줍는다. 공의 색상이 non-descending 순서가 되도록 공을 주운 뒤 다시 원점으로 돌아온다. 이 때, 필요한 최소 시간을 구하는 문제다.

색상이 같은 공은 연속하게 주어야 한다. 또한 왼쪽에서 오른쪽으로 가면서 모두 줍거나 오른쪽에서 왼쪽으로 가면서 모두 줍는 게 최단 시간이 걸린다는 것을 알 수 있다(귀류법).

dp[i][0] = (색상이 0~i-1인 공을 모두 줍고, 색상이 i인 공을 왼쪽에서 오른쪽으로 가면서 모두 줍는데 걸리는 최소 시간)

dp[i][1] = (색상이 0~i-1인 공을 모두 줍고, 색상이 i인 공을 오른쪽에서 왼쪽으로 가면서 모두 줍는데 걸리는 최소 시간)

와 같이 정의하면 다이나믹 프로그래밍으로 해결할 수 있다.

**64bit int를 안써서 두 번 틀렸다**. ~~뭐하냐 상원아.~~

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, x[200000], c[200000];

lint l[200001], r[200001];
lint dp[200001][2];

lint solve(){
    map<int,vector<int>> idx;
    for(int i=0;i<n;++i)
        idx[c[i]].emplace_back(x[i]);

    int m = 0;
    for(auto &[c, v] : idx){
        l[m] = *min_element(v.begin(), v.end());
        r[m] = *max_element(v.begin(), v.end());
        m++;
    }
    l[m] = r[m] = 0; m++;

    dp[0][0] = abs(0 - r[0]) + abs(r[0] - l[0]);
    dp[0][1] = abs(0 - l[0]) + abs(r[0] - l[0]);
    for(int i=1;i<m;++i){
        dp[i][0] = min(
                dp[i-1][0] + abs(l[i-1]-r[i]) + abs(r[i]-l[i]),
                dp[i-1][1] + abs(r[i-1]-r[i]) + abs(r[i]-l[i]));
        dp[i][1] = min(
                dp[i-1][0] + abs(l[i-1]-l[i]) + abs(r[i]-l[i]),
                dp[i-1][1] + abs(r[i-1]-l[i]) + abs(r[i]-l[i]));
    }
    return min(dp[m-1][0], dp[m-1][1]);
}

int main(){
    scanf("%d",&n);
    for(int i=0;i<n;++i)
        scanf("%d%d",x+i,c+i);
    printf("%lld",solve());
}
```

### F. Construct a Palindrome

다음에 풀어보도록 하자.
