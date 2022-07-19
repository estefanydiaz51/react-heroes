import { Route, Routes } from 'react-router-dom';

import { HeroesRoutes } from '../heroes';
import { LoginPage } from '../auth';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';

export const AppRouter = () => {
    return (
        <>
            <Routes>

                <Route path="login/*" element={
                    <PublicRouter>
                        <Routes>
                            <Route path="/*" element={ <LoginPage /> } />
                        </Routes>
                    </PublicRouter>
                } />
                
                

                <Route path="/*" element={ <PrivateRouter>
                    <HeroesRoutes /> 
                </PrivateRouter> 
                }  />
                {/* <Route path="/*" element={ <HeroesRoutes /> } />
                <Route path="login" element={ <LoginPage /> } /> */}
            </Routes>
        </>
    )
}

