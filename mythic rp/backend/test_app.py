import traceback

from app import create_app


def run_tests():
    try:
        app = create_app()
        client = app.test_client()
        r1 = client.get('/')
        print('GET / status_code =', r1.status_code)
        # avoid printing the whole HTML; print a short snippet
        print('GET / length =', len(r1.data or b''))

        r2 = client.get('/api/steps')
        print('GET /api/steps status_code =', r2.status_code)
        print('GET /api/steps json type =', type(r2.json))
        print('GET /api/steps json sample =', r2.json[:1])
    except Exception:
        print('Exception during test:')
        traceback.print_exc()


if __name__ == '__main__':
    run_tests()
