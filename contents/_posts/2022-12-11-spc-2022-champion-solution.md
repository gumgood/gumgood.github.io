---
title: "2022 서강대학교 프로그래밍 경시대회 Champion 부문 - Python 정답 코드"
categories: [cp-algorithm]
tags: [spc, python]
---

대회 문제는 백준 온라인 저지에 공개되어있다. <https://www.acmicpc.net/category/697>

## A. 완전한 수열 (BOJ 26090)

```python
import sys

input = lambda: sys.stdin.readline().strip('\n')


def solve():
    def p(x):
        for d in range(2, x):
            if x % d == 0:
                return False
            if x < d * d:
                break
        return x > 1

    ret = 0
    for i in range(n):
        for j in range(i, n):
            ret += p(j - i + 1) and p(sum(a[i:j + 1]))
    return ret


for T in range(1):
    n = int(input())
    a = list(map(int, input().split()))
    print(solve())
```

## B. DPS (BOJ 26084)

```python
import sys

input = lambda: sys.stdin.readline().strip('\n')


def solve():
    cnta = [0] * 256
    for it in a:
        cnta[ord(it[0])] += 1

    cnts = [0] * 256
    for it in s:
        cnts[ord(it)] += 1

    ret = 1
    for i, cnt in enumerate(cnts):
        if cnt == 1:
            ret *= cnta[i]
        elif cnt == 2:
            ret *= cnta[i] * (cnta[i] - 1) // 2
        elif cnt == 3:
            ret *= cnta[i] * (cnta[i] - 1) * (cnta[i] - 2) // 6
    return ret


for T in range(1):
    s = input()
    n = int(input())
    a = [''] * n
    for i in range(n):
        a[i] = input()
    print(solve())
```

## C. 현대모비스 소프트웨어 아카데미 (BOJ 26091)

```python
import sys

input = lambda: sys.stdin.readline().strip('\n')


def solve():
    a.sort()
    return sum([1 for i in range(n // 2) if a[i] + a[n - 1 - i] >= m])


for T in range(1):
    n, m = map(int, input().split())
    a = list(map(int, input().split()))
    print(solve())
```

## D. 수학적인 최소 공통 조상 (BOJ 26092)

```python
import sys

input = lambda: sys.stdin.readline().strip('\n')


def solve(a, b):

    def lpf(p, x):
        for d in range(p, x):
            if not x % d:
                return d, x // d
            if d * d >= x:
                break
        return x, 1

    pa, pb = 2, 2
    while a != b:
        if a > b:
            pa, a = lpf(pa, a)
        else:
            pb, b = lpf(pb, b)
    return a


for T in range(1):
    a, b = map(int, input().split())

    print(solve(a, b))
```

## E. 고양이 목에 리본 달기 (BOJ 26093)

```python
import sys

input = lambda: sys.stdin.readline().strip('\n')


def solve():
    pmx = [0] * (k + 1)
    smx = [0] * (k + 1)
    for i in range(n):
        dp = [a[i][j] + max(pmx[j - 1], smx[j + 1]) for j in range(k)] + [0]
        for j in range(k):
            pmx[j] = max(pmx[j - 1], dp[j])
            smx[k - j - 1] = max(smx[k - j], dp[k - j - 1])
    return max(dp)


for T in range(1):
    n, k = map(int, input().split())
    a = [list(map(int, input().split())) + [0] for _ in range(n)]

    print(solve())
```

## F. 더 어려운 스케줄링 (BOJ 26094)

Python에서 중간 원소 삭제를 지원하는 set 자료구조가 없다. 따라서 lazy하게 삭제를 수행하는 자료구조를 따로 구현했다.

```python
import sys, heapq
from collections import deque

input = lambda: sys.stdin.readline().strip('\n')


class mySet():
    def __init__(self, rev=False):
        self.q = []
        self.d = []
        self.rev = rev

    def push(self, x):
        heapq.heappush(self.q, -x if self.rev else x)

    def remove(self, x):
        heapq.heappush(self.d, -x if self.rev else x)

    def top(self):
        while self.q and self.d and self.q[0] == self.d[0]:
            heapq.heappop(self.q)
            heapq.heappop(self.d)
        return -self.q[0] if self.rev else self.q[0]

    def empty(self):
        while self.q and self.d and self.q[0] == self.d[0]:
            heapq.heappop(self.q)
            heapq.heappop(self.d)
        return not bool(self.q)


def solve():
    ret = []
    q, r = mySet(), mySet(rev=True)
    f, b = deque(), deque()
    for o, *p in qry:
        if o == 0:
            f.append(p[0])
        elif o == 1:
            for x in f + b:
                q.push(x)
                r.push(x)
            if not q.empty() and q.top() > r.top():
                q, r = r, q
            f.clear()
            b.clear()
        elif o == 2:
            q, r = r, q
            f, b = b, f
        elif o == 3:
            if f:
                ret.append(f.pop())
            elif not q.empty():
                ret.append(q.top())
                q.remove(ret[-1])
                r.remove(ret[-1])
            else:
                ret.append(b.popleft())
    return ret


for T in range(1):
    n, q = map(int, input().split())
    qry = [tuple(map(int, input().split())) for _ in range(q)]

    print('\n'.join(map(str, solve())))
```

## G. Maximize MEX (BOJ 26095)

<https://www.acmicpc.net/problem/19857>와 동일한 방법으로 해결할 수 있다.

```python
import sys

input = lambda: sys.stdin.readline().strip('\n')


def solve():
    def chk(l):
        res, nd = n - sum(c[1:l]), 0
        for i in range(1, l)[::-1]:
            if c[i] >= nd + 1:
                res += c[i] - (nd + 1)
            else:
                nd += (nd + 1) - c[i]
        return res > nd

    c = [0] * n
    for x in a:
        c[x] += 1

    s, e = 0, n + 1
    while s < e:
        m = (s + e) // 2
        if chk(m):
            s = m + 1
        else:
            e = m
    return s - 1


for T in range(1):
    n = int(input())
    a = list(map(int, input().split()))

    print(solve())
```

## H. 슈퍼 블랙잭 (BOJ 26096)

상한이 $3E$를 넘지 않는데 $E$의 최대값이 $10,000$이므로 이분 탐색 범위를 $30,000$까지 잡아주면 된다.

```python
import sys

input = lambda: sys.stdin.readline().strip('\n')
EPS = 1e-6


def solve():
    def f(f0):
        dp = [0.0] * 30001
        pdp = [0.0] * 30001
        for i in range(0, 30000)[::-1]:
            if i < s:
                dp[i] = min([1 + (pdp[i + 1] - pdp[i + aj + 1]) / aj for aj in a])
            else:
                dp[i] = 0 if i <= e else f0
            pdp[i] = dp[i] + pdp[i + 1]
        return dp[0] + EPS > f0

    l, r = 0, 30000
    while r - l > EPS:
        m = (l + r) / 2
        if f(m):
            l = m
        else:
            r = m
    return l


for T in range(1):
    d = int(input())
    a = list(map(int, input().split()))
    s, e = map(int, input().split())

    print(solve())
```

---

## 여담

이번 Champion 대회에서는 구현이 복잡한 알고리즘이 출제되지 않았다. 덕분에 모든 문제에 대해 파이썬으로 작성한 정답 코드를 작성할 수 있었다.